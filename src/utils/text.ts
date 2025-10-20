import { loadAndValidateKeyTitleMapping } from './data-loaders.ts';
import { escapeHtml } from './html.ts';

const keyTitleMapping = await loadAndValidateKeyTitleMapping();
const { keyToTitleMap } = keyTitleMapping;

/**
 * Formats a technical key into a human-readable title using a predefined map.
 *
 * @param key - The key to format (e.g., 'livingInPoverty').
 * @returns The corresponding title (e.g., 'Living in Poverty').
 * @throws If the key is not found in the mapping file.
 */
export function formatKeyToTitle(key: string): string {
  if (keyToTitleMap[key]) {
    return keyToTitleMap[key];
  }

  throw new Error(`Missing key-to-title mapping for key: "${key}"`);
}

/**
 * Formats a string by escaping HTML and converting markdown-like bold syntax to `<strong>` tags.
 *
 * @param text - The text to format.
 * @returns The formatted HTML string.
 */
export function formatText(text: string): string {
  const escaped = escapeHtml(text);

  const result = escaped.replaceAll(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  return result;
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
