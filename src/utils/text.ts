import tooltipsRaw from '../data/tooltips/tooltips.json';
import { validateTooltips } from '../validators/tooltips.ts';
import { escapeHtml } from './html.ts';

const tooltips = validateTooltips(tooltipsRaw);

const tooltipEntries = Object.keys(tooltips)
  .filter((key) => key !== '$schema')
  .map((key) => ({
    key,
    regex: new RegExp(
      `\\b(?<!-)${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b(?!-)`,
      'gi'
    ),
    def: tooltips[key],
  }))
  .sort((a, b) => b.key.length - a.key.length);

/**
 * Injects tooltips into text by wrapping matching words/phrases with data-tooltip spans.
 * Skips text inside ** ** (bold markdown).
 *
 * @param text - The HTML text to process.
 * @returns The text with tooltips injected.
 */
function injectTooltips(text: string): string {
  const parts = text.split(/\*\*/);
  const processedParts = parts.map((part, index) => {
    if (index % 2 === 0) {
      return injectTooltipsToPlainText(part);
    } else {
      return part;
    }
  });
  return processedParts.join('**');
}

/**
 * Injects tooltips into plain text (no markdown).
 */
function injectTooltipsToPlainText(text: string): string {
  const matches: Array<{
    matchedText: string;
    start: number;
    end: number;
    def: string;
    key: string;
  }> = [];

  for (const entry of tooltipEntries) {
    let match;
    while ((match = entry.regex.exec(text)) !== null) {
      matches.push({
        matchedText: match[0],
        start: match.index,
        end: match.index + match[0].length,
        def: entry.def,
        key: entry.key,
      });
    }
  }

  const firstMatches = new Map<string, (typeof matches)[0]>();
  for (const match of matches) {
    if (!firstMatches.has(match.key)) {
      firstMatches.set(match.key, match);
    }
  }

  const filteredMatches = Array.from(firstMatches.values());

  filteredMatches.sort((a, b) => {
    if (a.start !== b.start) {
      return b.start - a.start;
    }
    return b.matchedText.length - a.matchedText.length;
  });

  const nonOverlappingMatches: typeof matches = [];
  for (const match of filteredMatches) {
    const overlaps = nonOverlappingMatches.some(
      (existing) => match.start < existing.end && match.end > existing.start
    );
    if (!overlaps) {
      nonOverlappingMatches.push(match);
    }
  }

  let result = text;
  const replacements: Array<{ placeholder: string; span: string }> = [];
  for (const match of nonOverlappingMatches) {
    const placeholder = `__TOOLTIP_${replacements.length}__`;
    replacements.push({
      placeholder,
      span: `<span data-tooltip="${escapeHtml(match.def)}">${match.matchedText}</span>`,
    });
    const before = result.slice(0, match.start);
    const after = result.slice(match.end);
    result = before + placeholder + after;
  }

  for (const { placeholder, span } of replacements) {
    result = result.replaceAll(placeholder, span);
  }

  return result;
}

/**
 * Formats a string by escaping HTML and converting markdown-like bold syntax to `<strong>` tags.
 *
 * @param text - The text to format.
 * @returns The formatted HTML string.
 */
export function formatText(text: string): string {
  const escaped = escapeHtml(text);
  const withTooltips = injectTooltips(escaped);
  const bolded = withTooltips.replaceAll(
    /\*\*(.*?)\*\*/g,
    '<strong>$1</strong>'
  );
  return bolded;
}

/**
 * Splits a block of text into formatted paragraphs.
 *
 * @param text - The block of text to process.
 * @returns An array of formatted HTML paragraph strings.
 */
export function formatParagraphs(text: string): string[] {
  return text
    .split('\n\n')
    .filter((para: string) => para.trim())
    .map((para: string) => formatText(para));
}
