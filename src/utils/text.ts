import { escapeHtml } from './html.ts';

/**
 * Formats a string by escaping HTML and converting markdown-like bold and italic syntax to <strong> and <em> tags.
 *
 * @param text - The text to format.
 * @returns The formatted HTML string.
 */
export function formatText(text: string): string {
  const escaped = escapeHtml(text);
  const bolded = escaped.replaceAll(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  const italicized = bolded.replaceAll(/\*(.*?)\*/g, '<em>$1</em>');
  return italicized;
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
