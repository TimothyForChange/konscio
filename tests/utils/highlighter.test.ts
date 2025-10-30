import { describe, expect, it } from 'vitest';
import { getCachedHighlighter } from '../../src/utils/highlighter';

describe('highlighter', () => {
  it('should return a highlighter instance', async () => {
    const highlighter = await getCachedHighlighter();
    expect(highlighter).toBeDefined();
    expect(typeof highlighter.codeToHtml).toBe('function');
  });

  it('should cache the highlighter', async () => {
    const highlighter1 = await getCachedHighlighter();
    const highlighter2 = await getCachedHighlighter();
    expect(highlighter1).toBe(highlighter2);
  });

  it('should highlight JavaScript code', async () => {
    const highlighter = await getCachedHighlighter();
    const code = 'console.log("hello world");';
    const html = highlighter.codeToHtml(code, {
      lang: 'javascript',
      theme: 'github-dark',
    });
    expect(html).toContain('<code');
    expect(html).toContain('console');
    expect(html).toContain('log');
  });

  it('should highlight TypeScript code', async () => {
    const highlighter = await getCachedHighlighter();
    const code = 'const message: string = "hello";';
    const html = highlighter.codeToHtml(code, {
      lang: 'typescript',
      theme: 'github-dark',
    });
    expect(html).toContain('<code');
    expect(html).toContain('const');
    expect(html).toContain('string');
  });

  it('should highlight CSS code', async () => {
    const highlighter = await getCachedHighlighter();
    const code = 'body { color: red; }';
    const html = highlighter.codeToHtml(code, {
      lang: 'css',
      theme: 'github-dark',
    });
    expect(html).toContain('<code');
    expect(html).toContain('body');
    expect(html).toContain('color');
  });

  it('should highlight HTML code', async () => {
    const highlighter = await getCachedHighlighter();
    const code = '<div>Hello</div>';
    const html = highlighter.codeToHtml(code, {
      lang: 'html',
      theme: 'github-dark',
    });
    expect(html).toContain('<code');
    expect(html).toContain('div');
    expect(html).toContain('Hello');
  });

  it('should handle empty code gracefully', async () => {
    const highlighter = await getCachedHighlighter();
    const code = '';
    const html = highlighter.codeToHtml(code, {
      lang: 'javascript',
      theme: 'github-dark',
    });
    expect(html).toContain('<code');
  });
});
