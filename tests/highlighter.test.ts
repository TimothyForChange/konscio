import { createHighlighter } from 'shiki';
import { describe, expect, it, vi } from 'vitest';
import { getCachedHighlighter } from '../src/utils/highlighter';

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
});
