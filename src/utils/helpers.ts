/**
 * Generates a URL-friendly slug from a given string.
 * This function converts the string to lowercase and replaces one or more whitespace
 * characters with a single hyphen.
 *
 * @param str - The input string to convert.
 * @returns The generated slug.
 */
export function generateSlug(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-');
}
