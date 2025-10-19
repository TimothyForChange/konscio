/**
 * Escapes special HTML characters in a string to prevent it from being interpreted as HTML.
 * This is a security measure to prevent XSS attacks when rendering user-generated or
 * dynamic content.
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
