/**
 * Generates a URL-friendly slug from a string.
 *
 * @param str - Input string to convert
 * @returns Generated slug
 */
export function generateSlug(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-');
}
