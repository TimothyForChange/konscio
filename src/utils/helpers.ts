export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isNonEmptyArray<T>(value: unknown): value is T[] {
  return Array.isArray(value) && value.length > 0;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function generateSlug(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-');
}
