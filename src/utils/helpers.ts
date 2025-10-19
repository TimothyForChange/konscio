export function generateSlug(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-');
}
