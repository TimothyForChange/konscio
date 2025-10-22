import tooltipsRaw from '../data/tooltips.json';
import { validateTooltips } from '../validators/tooltips.ts';
import { escapeHtml } from './html.ts';

const tooltips = validateTooltips(tooltipsRaw);

/**
 * Injects tooltips into text by wrapping matching words/phrases with data-tooltip spans.
 *
 * @param text - The HTML text to process.
 * @returns The text with tooltips injected.
 */
function injectTooltips(text: string): string {
  const sortedKeys = Object.keys(tooltips)
    .filter((key) => key !== '$schema')
    .sort((a, b) => b.length - a.length);
  const matches: Array<{
    matchedText: string;
    start: number;
    end: number;
    def: string;
  }> = [];

  for (const key of sortedKeys) {
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b(?<!-)${escapedKey}\\b(?!-)`, 'gi');
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        matchedText: match[0],
        start: match.index,
        end: match.index + match[0].length,
        def: tooltips[key as keyof typeof tooltips],
      });
    }
  }

  matches.sort((a, b) => {
    if (a.start !== b.start) {
      return b.start - a.start;
    }
    return b.matchedText.length - a.matchedText.length;
  });

  const filteredMatches: typeof matches = [];
  for (const match of matches) {
    const overlaps = filteredMatches.some(
      (existing) => match.start < existing.end && match.end > existing.start
    );
    if (!overlaps) {
      filteredMatches.push(match);
    }
  }

  let result = text;
  const replacements: Array<{ placeholder: string; span: string }> = [];
  for (const match of filteredMatches) {
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
  const bolded = escaped.replaceAll(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  return injectTooltips(bolded);
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
