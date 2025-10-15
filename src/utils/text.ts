import { escapeHtml } from './html';

export function formatText(text: string): string {
  const escaped = escapeHtml(text);

  let result = escaped.replaceAll(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  result = result.replaceAll(
    /\[([^\]]+)\](?!\()/g,
    (match, p1, offset, string_) => {
      const previousChar = offset > 0 ? string_[offset - 1] : '';
      if (previousChar === '!') {
        return match;
      }
      return `<cite class="bracketed">${p1}</cite>`;
    }
  );

  return result;
}
