import { readdir, readFile, writeFile } from 'node:fs/promises';
import http from 'node:http';
import https from 'node:https';
import { extname, resolve } from 'node:path';

const CACHE_VERSION = 1;

const DEFAULTS = {
  timeout: 8000,
  concurrency: 5,
  allowPatterns: [],
  failOn: [0, 400, 401, 404, 410, 429, 500, 502, 503, 504],
  warnOnly: true,
  userAgent: 'ligilarbo-link-check/1.0 (+https://mooship.co.za) Node',
  userAgents: [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  ],
  randomizeUserAgent: true,
  jitterMs: 120,
  maxRedirects: 5,
  retries: 1,
  retryDelay: 500,
  treat403AsOk: true,
  cache: true,
  cacheFile: '.link-check-cache.json',
  cacheMaxAgeMs: 60 * 1000,
  referer: 'https://mooship.co.za/',
  acceptEncoding: 'gzip, deflate, br',
  headPrefetchDomains: [], // e.g. ['www.example.com']
  headSatisfiesSuccess: true,
};

function pickProtocol(url) {
  return url.startsWith('https:') ? https : http;
}

function pickUA(options) {
  if (
    options.randomizeUserAgent &&
    Array.isArray(options.userAgents) &&
    options.userAgents.length
  ) {
    return options.userAgents[
      Math.floor(Math.random() * options.userAgents.length)
    ];
  }
  return options.userAgent;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function requestUrl(url, options, depth = 0, method = 'GET') {
  if (options.jitterMs) {
    const jitter = Math.random() * options.jitterMs;
    if (jitter > 5) await sleep(jitter);
  }
  return new Promise((resolvePromise) => {
    if (depth > options.maxRedirects) {
      return resolvePromise({
        status: 0,
        error: new Error('Too many redirects'),
      });
    }
    const lib = pickProtocol(url);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), options.timeout).unref();
    const req = lib.request(
      url,
      {
        method,
        signal: controller.signal,
        headers: {
          'user-agent': pickUA(options),
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'accept-language': 'en-US,en;q=0.9',
          'accept-encoding': options.acceptEncoding,
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          'upgrade-insecure-requests': '1',
          'sec-fetch-mode': 'navigate',
          referer: options.referer,
        },
      },
      (res) => {
        const status = res.statusCode || 0;
        const loc = res.headers.location;
        res.resume();
        clearTimeout(timer);
        if (loc && [301, 302, 303, 307, 308].includes(status)) {
          const nextUrl = new URL(loc, url).toString();
          resolvePromise(requestUrl(nextUrl, options, depth + 1));
          return;
        }
        resolvePromise({ status });
      }
    );
    req.on('error', (err) => {
      clearTimeout(timer);
      resolvePromise({ status: 0, error: err });
    });
    req.end();
  });
}

function hostnameFromUrl(u) {
  try {
    return new URL(u).hostname;
  } catch {
    return '';
  }
}

async function headThenGetIfNeeded(url, options) {
  const host = hostnameFromUrl(url);
  if (!options.headPrefetchDomains || !options.headPrefetchDomains.length)
    return null;
  if (!options.headPrefetchDomains.includes(host)) return null;
  const headRes = await requestUrl(url, options, 0, 'HEAD');
  if (options.headSatisfiesSuccess && headRes.status && headRes.status < 400) {
    return headRes; // Accept HEAD as final
  }
  return null; // Will proceed with GET
}

async function checkUrl(url, options, cache) {
  const transient = new Set([429, 500, 502, 503, 504, 522]);
  let attempt = 0;
  let result;
  if (options.cache && cache) {
    const hit = cache.get(url);
    if (hit) {
      return hit;
    }
  }
  const preflight = await headThenGetIfNeeded(url, options);
  if (preflight) {
    result = preflight;
    attempt = options.retries + 1; // skip loop
  }
  while (attempt <= options.retries) {
    result = await requestUrl(url, options);
    if (!transient.has(result.status) || attempt === options.retries) {
      break;
    }
    await new Promise((r) => setTimeout(r, options.retryDelay));
    attempt++;
  }
  let status = result.status;
  if (options.treat403AsOk && status === 403 && !options.failOn.includes(403)) {
    return {
      url,
      status,
      broken: false,
      note: '403 treated as OK (bot protection suspected)',
    };
  }
  const broken = options.failOn.includes(status);
  const final = { url, status, broken };
  if (options.cache && cache && !final.broken) {
    cache.set(url, final);
  }
  return final;
}

async function extractLinksFromJsonFile(filePath) {
  try {
    const raw = await readFile(filePath, 'utf8');
    const json = JSON.parse(raw);
    const urls = new Set();
    const walk = (value) => {
      if (!value) {
        return;
      }
      if (typeof value === 'string') {
        if (/^https?:\/\//i.test(value)) {
          urls.add(value.trim());
        }
        return;
      }
      if (Array.isArray(value)) {
        for (const v of value) {
          walk(v);
        }
        return;
      }
      if (typeof value === 'object') {
        for (const [k, v] of Object.entries(value)) {
          if (
            k.toLowerCase() === 'url' &&
            typeof v === 'string' &&
            /^https?:\/\//i.test(v)
          ) {
            urls.add(v.trim());
          }
          walk(v);
        }
      }
    };
    walk(json);
    return Array.from(urls);
  } catch (e) {
    console.warn('[broken-links] Failed to parse JSON', filePath, e?.message);
    return [];
  }
}

async function gatherJsonFiles(options) {
  if (options.paths && options.paths.length) {
    return options.paths.filter((p) => p.endsWith('.json'));
  }
  const dir = resolve(process.cwd(), 'src', 'data');
  let entries = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (e) {
    console.warn('[broken-links] Could not read directory', dir, e?.message);
    return [];
  }
  return entries
    .filter((e) => e.isFile() && extname(e.name) === '.json')
    .map((e) => resolve(dir, e.name));
}

function createLimiter(limit) {
  let active = 0;
  const queue = [];
  const runNext = () => {
    if (active >= limit) {
      return;
    }
    const next = queue.shift();
    if (!next) {
      return;
    }
    active++;
    next().finally(() => {
      active--;
      runNext();
    });
  };
  return (fn) =>
    new Promise((resolve, reject) => {
      queue.push(() => fn().then(resolve, reject));
      runNext();
    });
}

function loadCache(options) {
  if (!options.cache) return null;
  try {
    const raw = require('node:fs').readFileSync(options.cacheFile, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed.version !== CACHE_VERSION) {
      return { map: new Map(), dirty: false };
    }
    const now = Date.now();
    const map = new Map();
    for (const [url, entry] of Object.entries(parsed.entries || {})) {
      if (now - entry.time <= options.cacheMaxAgeMs) {
        map.set(url, entry.data);
      }
    }
    return { map, dirty: false };
  } catch {
    return { map: new Map(), dirty: false };
  }
}

async function persistCache(options, cacheState) {
  if (!options.cache || !cacheState || !cacheState.dirty) {
    return;
  }
  const obj = { version: CACHE_VERSION, entries: {} };
  for (const [url, data] of cacheState.map.entries()) {
    obj.entries[url] = { time: Date.now(), data };
  }
  try {
    await writeFile(options.cacheFile, JSON.stringify(obj, null, 2), 'utf8');
  } catch (e) {
    console.warn('[broken-links] Failed to write cache', e?.message);
  }
}

export function brokenLinksIntegration(userOptions = {}) {
  const options = { ...DEFAULTS, ...userOptions };
  const skip = process.env.SKIP_LINK_CHECK === '1';
  const cacheState = loadCache(options);
  const cache = cacheState ? cacheState.map : null;
  return {
    name: 'broken-links-integration',
    hooks: {
      'astro:build:done': async ({ logger }) => {
        if (skip) {
          logger.info('[broken-links] Skipped via SKIP_LINK_CHECK=1');
          return;
        }
        const files = await gatherJsonFiles(options);
        if (!files.length) {
          logger.info('[broken-links] No JSON files found to scan.');
          return;
        }
        logger.info(
          `[broken-links] Scanning ${files.length} JSON file(s) for external links...`
        );
        const allLinks = new Set();
        for (const f of files) {
          const links = await extractLinksFromJsonFile(f);
          links.forEach((l) => allLinks.add(l));
        }
        const candidates = Array.from(allLinks).filter(
          (url) => !options.allowPatterns.some((r) => r.test(url))
        );
        logger.info(
          `[broken-links] Checking ${candidates.length} unique URL(s)...`
        );
        const limiter = createLimiter(options.concurrency);
        const results = [];

        for (const url of candidates) {
          results.push(
            limiter(async () => {
              const res = await checkUrl(url, options, cache);
              if (res.broken) {
                logger.warn(`[broken-links] BROKEN (${res.status}) ${url}`);
              } else if (res.note) {
                logger.info(
                  `[broken-links] OK (${res.status}) ${url} - ${res.note}`
                );
              }
              if (options.cache && cache && !cache.has(url)) {
                cacheState.dirty = true;
              }
              return res;
            })
          );
        }
        const final = await Promise.all(results);
        const broken = final.filter((r) => r.broken);
        if (broken.length) {
          const summary = broken.map((b) => `${b.status} ${b.url}`).join('\n');
          if (options.warnOnly) {
            logger.warn(
              `\n[broken-links] Summary: ${broken.length} broken link(s) detected.\n${summary}`
            );
          } else {
            throw new Error(
              `[broken-links] ${broken.length} broken link(s) detected:\n${summary}`
            );
          }
        } else {
          logger.info('[broken-links] All links OK');
        }
        await persistCache(options, cacheState);
      },
    },
  };
}

export default brokenLinksIntegration;
