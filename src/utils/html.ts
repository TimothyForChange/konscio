/**
 * Escapes special HTML characters in a string to prevent XSS attacks, except for whitelisted tags.
 *
 * @param string_ - The input string to escape.
 * @param whitelist - Array of allowed tag names (e.g., ['strong', 'em']).
 * @returns The escaped string with HTML characters replaced by their corresponding entities, except whitelisted tags.
 */
export function escapeHtml(string_: string, whitelist: string[] = []): string {
  if (!whitelist.length) {
    return string_
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  const tagPattern = new RegExp(`<\/?(${whitelist.join('|')})[^>]*>`, 'gi');

  const tags: string[] = [];
  let counter = 0;
  const temp = string_.replace(tagPattern, (tag) => {
    tags.push(tag);
    return `__TAG_${counter++}__`;
  });

  const escaped = temp
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

  return escaped.replace(/__TAG_(\d+)__/g, (_, index) => tags[parseInt(index)]);
}
