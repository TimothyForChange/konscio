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

  it('handles null file object', () => {
    expect(() => {
      remarkReadingTime()({} as any, null as any);
    }).not.toThrow();
  });

  it('handles file with no data property', () => {
    const file: any = {};
    expect(() => {
      remarkReadingTime()({} as any, file);
    }).not.toThrow();
    expect(file.data).toBeUndefined();
  });

  it('handles file with no astro property', () => {
    const file: any = { data: {} };
    expect(() => {
      remarkReadingTime()({} as any, file);
    }).not.toThrow();
    expect(file.data.astro).toBeUndefined();
  });
});
