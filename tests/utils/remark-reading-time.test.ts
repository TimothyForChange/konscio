import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { describe, expect, it } from 'vitest';
import { remarkReadingTime } from '../../plugins/remark-reading-time';

describe('remarkReadingTime', () => {
  function runPlugin(markdown: string, options = {}) {
    const file: any = { data: { astro: { frontmatter: {} } } };
    const tree = unified().use(remarkParse).parse(markdown);
    remarkReadingTime(options)(tree, file);
    return file.data.astro.frontmatter.minutesRead;
  }

  it('calculates reading time for typical content', () => {
    const result = runPlugin('This is a test post with some words.');
    expect(result).toMatch(/min read$/);
  });

  it('returns 1 min read for empty content', () => {
    const result = runPlugin('');
    expect(result).toBe('1 min read');
  });

  it('supports custom wordsPerMinute', () => {
    const result = runPlugin('word '.repeat(400), { wordsPerMinute: 400 });
    expect(result).toMatch(/1 min read/);
  });

  it('handles errors gracefully', () => {
    const file: any = { data: { astro: { frontmatter: {} } } };
    expect(() => {
      remarkReadingTime()(null as any, file);
    }).not.toThrow();
    expect(file.data.astro.frontmatter.minutesRead).toMatch(/min read$/);
  });

  it('handles invalid wordsPerMinute values', () => {
    const result = runPlugin('test content', { wordsPerMinute: 0 });
    expect(result).toBe('2 min read');

    const result2 = runPlugin('test content', { wordsPerMinute: -100 });
    expect(result2).toBe('2 min read');
  });

  it('handles very large content', () => {
    const largeContent = 'word '.repeat(10000);
    const result = runPlugin(largeContent);
    expect(result).toMatch(/^\d+ min read$/);
    expect(parseInt(result)).toBeGreaterThan(10);
  });

  it('handles malformed markdown', () => {
    const malformed = '[broken link](unclosed' + '('.repeat(1000);
    const result = runPlugin(malformed);
    expect(result).toMatch(/min read$/);
  });

  it('handles null/undefined file parameter', () => {
    expect(() => {
      remarkReadingTime()({} as any, null as any);
    }).not.toThrow();

    expect(() => {
      remarkReadingTime()({} as any, undefined as any);
    }).not.toThrow();
  });
});
