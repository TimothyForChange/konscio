import { escapeHtml } from './html.ts';

export function formatKeyToTitle(key: string): string {
  const spaced = key.replaceAll(/([A-Z])/g, ' $1');

  let formatted = spaced;

  formatted = formatted.replaceAll(/\s?nato\s/gi, ' NATO ');
  formatted = formatted.replaceAll(/\s?un\s/gi, ' UN ');
  formatted = formatted.replaceAll(/\s?imf\s/gi, ' IMF ');
  formatted = formatted.replaceAll(/\s?eu\s/gi, ' EU ');
  formatted = formatted.replaceAll(/\s?uk\s/gi, ' UK ');
  formatted = formatted.replaceAll(/\s?us\s/gi, ' US ');

  formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);

  formatted = formatted.replaceAll(' And ', ' & ');
  formatted = formatted.replaceAll(' Vs ', ' vs. ');
  formatted = formatted.replaceAll(' Of ', ' of ');
  formatted = formatted.replaceAll(' As ', ' as ');
  formatted = formatted.replaceAll(' In ', ' in ');
  formatted = formatted.replaceAll(' Out ', ' out ');

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
