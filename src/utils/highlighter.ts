import { createHighlighter } from 'shiki';

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;
let cachedProxy: any = null;

export async function getCachedHighlighter() {
  if (!highlighter) {
    try {
      highlighter = await createHighlighter({
        themes: ['github-dark'],
        langs: [
          'javascript',
          'typescript',
          'astro',
          'css',
          'json',
          'bash',
          'html',
          'markdown',
        ],
      });
    } catch (error) {
      throw new Error(`Failed to create Shiki highlighter: ${error}`);
    }
  }

  // Cache the proxy to maintain reference equality
  if (!cachedProxy) {
    cachedProxy = new Proxy(highlighter, {
      get: (target, prop) => {
        if (prop === 'codeToHtml') {
          return (code: string, options: any) => {
            try {
              // Validate inputs before passing to Shiki
              if (code == null) {
                code = '';
              }

              if (!options || typeof options !== 'object') {
                options = { lang: 'text', theme: 'github-dark' };
              }

              // Check if the language is one we've loaded, if not default to text
              const availableLangs = target.getLoadedLanguages();
              if (options.lang && !availableLangs.includes(options.lang)) {
                // Create a new options object with a default language
                options = { ...options, lang: 'text' };
              }

              return target.codeToHtml(code, options);
            } catch (error) {
              // If all else fails, return a simple fallback
              return `<pre><code>${code || ''}</code></pre>`;
            }
          };
        }
        return target[prop as keyof typeof target];
      },
    });
  }

  return cachedProxy;
}
