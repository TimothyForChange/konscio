import keyToTitleMap from '../data/mapping/key-title-mapping';
import { escapeHtml } from './html.ts';

export function formatKeyToTitle(key: string): string {
  if (keyToTitleMap[key]) {
    return keyToTitleMap[key];
  }

  const spaced = key.replaceAll(/([A-Z])/g, ' $1');
  let formatted = spaced.charAt(0).toUpperCase() + spaced.slice(1);

  formatted = formatted.replaceAll(/\bNato\b/g, 'NATO');
  formatted = formatted.replaceAll(/\bUn\b/g, 'UN');
  formatted = formatted.replaceAll(/\bImf\b/g, 'IMF');
  formatted = formatted.replaceAll(/\bEu\b/g, 'EU');
  formatted = formatted.replaceAll(/\bUk\b/g, 'UK');
  formatted = formatted.replaceAll(/\bUs\b/g, 'US');
  formatted = formatted.replaceAll(/\bUssr\b/g, 'USSR');
  formatted = formatted.replaceAll(/\bAnd\b/g, ' & ');
  formatted = formatted.replaceAll(/\bVs\b/g, ' vs. ');
  formatted = formatted.replaceAll(/\bOf\b/g, ' of ');
  formatted = formatted.replaceAll(/\bAs\b/g, ' as ');
  formatted = formatted.replaceAll(/\bIn\b/g, ' in ');
  formatted = formatted.replaceAll(/\bOut\b/g, ' out ');

  return formatted;
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
