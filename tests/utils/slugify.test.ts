import { describe, expect, it } from 'vitest';
import { slugifyPath } from '../../src/utils/slugify';

describe('slugifyPath', () => {
  it('should return the filename without extension', () => {
    expect(slugifyPath('path/to/file.md')).toBe('file');
    expect(slugifyPath('file.txt')).toBe('file');
    expect(slugifyPath('simple')).toBe('simple');
  });

  it('should handle files with multiple dots', () => {
    expect(slugifyPath('file.tar.gz')).toBe('file.tar');
    expect(slugifyPath('file.name.with.dots.md')).toBe('file.name.with.dots');
  });

  it('should handle paths with backslashes', () => {
    expect(slugifyPath('path\\to\\file.md')).toBe('file');
  });

  it('should handle empty string', () => {
    expect(slugifyPath('')).toBe('');
  });

  it('should handle path ending with slash', () => {
    expect(slugifyPath('path/to/')).toBe('');
  });

  it('should handle paths with only separators', () => {
    expect(slugifyPath('/')).toBe('');
    expect(slugifyPath('\\')).toBe('');
    expect(slugifyPath('///')).toBe('');
  });
});
