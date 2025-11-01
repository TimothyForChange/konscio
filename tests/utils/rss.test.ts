import rss from '@astrojs/rss';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GET } from '../../src/pages/rss.xml.js';

vi.mock('@astrojs/rss', () => ({
  default: vi.fn(() => ({ status: 200, body: 'rss content' })),
}));

vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
}));

vi.mock('../../src/config', () => ({
  config: {
    title: 'Test Site',
    description: 'Test Description',
  },
}));

describe('rss.xml', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should generate RSS feed with correct structure', async () => {
    const context = { site: 'https://example.com' };
    await GET(context);

    expect(rss).toHaveBeenCalledWith({
      title: 'Test Site',
      description: 'Test Description',
      site: 'https://example.com',
      items: expect.any(Array),
      customData: `<language>en-gb</language>`,
    });

    const callArgs = (rss as any).mock.calls[0][0];
    expect(callArgs.items.length).toBeGreaterThan(0);
    expect(callArgs.items[0]).toHaveProperty('title');
    expect(callArgs.items[0]).toHaveProperty('pubDate');
    expect(callArgs.items[0]).toHaveProperty('description');
    expect(callArgs.items[0]).toHaveProperty('link');
    expect(callArgs.items[0].link).toMatch(/^\/blog\//);

    if (callArgs.items.length > 1) {
      expect(
        new Date(callArgs.items[0].pubDate).getTime()
      ).toBeGreaterThanOrEqual(new Date(callArgs.items[1].pubDate).getTime());
    }
  });

  it('should handle empty collection', async () => {
    const context = { site: 'https://example.com' };
    await GET(context);

    const callArgs = (rss as any).mock.calls[0][0];
    expect(Array.isArray(callArgs.items)).toBe(true);
  });

  it('should handle context without site URL', async () => {
    const context = {};
    await GET(context);

    const callArgs = (rss as any).mock.calls[0][0];
    expect(callArgs.site).toBeUndefined();
  });
});
