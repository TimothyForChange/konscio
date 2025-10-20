/**
 * Escapes special HTML characters in a string to prevent XSS attacks.
 *
 * @param string_ - The input string to escape.
 * @returns The escaped string with HTML characters replaced by their corresponding entities.
 */
export function escapeHtml(string_: string): string {
  return string_
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
