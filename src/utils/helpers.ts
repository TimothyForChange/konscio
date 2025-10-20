/**
 * Generates a URL-friendly slug from a string.
 *
 * @param str - The input string to convert.
 * @returns The generated slug.
 */
export function generateSlug(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-');
}
