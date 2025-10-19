import keyToTitleMap from '../data/mapping/key-title-mapping';
import { escapeHtml } from './html.ts';

export function formatKeyToTitle(key: string): string {
  if (keyToTitleMap[key]) {
    return keyToTitleMap[key];
  }

  throw new Error(`Missing key-to-title mapping for key: "${key}"`);
}

export function formatText(text: string): string {
  const escaped = escapeHtml(text);

  const result = escaped.replaceAll(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  return result;
}

export function formatParagraphs(text: string): string[] {
  return text
    .split('\n\n')
    .filter((para: string) => para.trim())
    .map((para: string) => formatText(para));
}
