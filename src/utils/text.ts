import { escapeHtml } from './html.ts';

/**
 * Trims a description to a maximum length, cleaning up whitespace and adding ellipsis if needed.
 *
 * @param desc - The description string to trim
 * @param max - The maximum character length (default: 160 for meta descriptions)
 * @returns The trimmed description string
 */
export function trimDescription(desc: string, max = 160): string {
  if (!desc) {
    return '';
  }

  const cleaned = desc.replaceAll(/\s+/g, ' ').trim();

  return cleaned.length > max
    ? `${cleaned.slice(0, max - 1).trimEnd()}…`
    : cleaned;
}

/**
 * Formats rich text by escaping HTML and converting markdown-like bold and italic syntax to semantic HTML tags.
 * Supports **bold** and *italic* markdown syntax. If paragraphs are detected (split by double newlines),
 * returns an array of formatted HTML strings for each paragraph. Otherwise returns a single formatted string.
 *
 * @param text - The input text with optional markdown formatting
 * @returns An array of formatted HTML paragraph strings, or a single formatted HTML string if no paragraphs detected
 */
export function formatRichText(text: string): string | string[] {
  const format = (input: string): string => {
    let html = input
      .replace(/\*\*(.*?)\*\*/gs, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gs, '<em>$1</em>');

    return escapeHtml(html, ['strong', 'em']);
  };

  const paragraphs = text.split(/\n{2,}/).filter((para) => para.trim());

  if (paragraphs.length > 1) {
    return paragraphs.map(format);
  }

  return format(text);
}
