import { escapeHtml } from './html';

export function formatKeyToTitle(key: string): string {
  if (key === 'laCentrafriqueProfonde') {
    return 'La Centrafrique Profonde (Deep Central Africa)';
  }

  const spaced = key.replaceAll(/([A-Z])/g, ' $1');

  let formatted = spaced.charAt(0).toUpperCase() + spaced.slice(1);

  formatted = formatted.replaceAll(' And ', ' & ');
  formatted = formatted.replaceAll(' Vs ', ' vs. ');
  formatted = formatted.replaceAll(' Of ', ' of ');
  formatted = formatted.replaceAll(' As ', ' as ');

  return formatted;
}

export function formatText(text: string): string {
  const escaped = escapeHtml(text);

  const result = escaped.replaceAll(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  return result;
}
