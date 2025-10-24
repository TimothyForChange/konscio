import { escapeHtml } from './html.ts';

/**
 * Formats rich text by escaping HTML and converting markdown-like bold and italic syntax to <strong> and <em> tags.
 * If paragraphs are detected (split by double newlines), returns an array of formatted HTML strings for each paragraph.
 * Otherwise, returns a single formatted HTML string.
 *
 * @param text - The text to format.
 * @returns An array of formatted HTML paragraph strings, or a single formatted string if no paragraphs.
 */
export function formatRichText(text: string): string | string[] {
  const format = (input: string): string => {
    return escapeHtml(input)
      .replace(/\*\*(.*?)\*\*/gs, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gs, '<em>$1</em>');
  };
  const paragraphs =
    typeof text === 'string'
      ? text.split(/\n{2,}/).filter((para) => para.trim())
      : [];
  if (paragraphs.length > 1) {
    return paragraphs.map(format);
  }
  return format(text);
}
