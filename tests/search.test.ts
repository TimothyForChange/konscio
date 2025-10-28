import { getCollection } from 'astro:content';
import { describe, expect, it, vi } from 'vitest';
import { GET } from '../src/pages/search.json.js';

vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
}));

describe('search.json', () => {
  it('should return search data for blog posts', async () => {
    const mockPosts = [
      {
        data: {
          title: 'Test Post 1',
          datePublished: new Date('2023-01-01'),
          excerpt: 'Test excerpt 1',
          categories: ['category1'],
        },
        slug: 'test-post-1',
      },
      {
        data: {
          title: 'Test Post 2',
          datePublished: new Date('2023-01-02'),
          description: 'Test description 2',
          categories: ['category2'],
        },
        slug: 'test-post-2',
      },
    ];

    (getCollection as any).mockResolvedValue(mockPosts);

    const response = await GET();
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toEqual([
      {
        title: 'Test Post 2',
        url: '/blog/test-post-2',
        datePublished: '2023-01-02T00:00:00.000Z',
        excerpt: 'Test description 2',
        categories: ['category2'],
      },
      {
        title: 'Test Post 1',
        url: '/blog/test-post-1',
        datePublished: '2023-01-01T00:00:00.000Z',
        excerpt: 'Test excerpt 1',
        categories: ['category1'],
      },
    ]);
  });

  it('should handle posts without excerpt or description', async () => {
    const mockPosts = [
      {
        data: {
          title: 'Untitled Post',
          datePublished: new Date('2023-01-01'),
        },
        slug: 'untitled-post',
      },
    ];

    (getCollection as any).mockResolvedValue(mockPosts);

    const response = await GET();
    const data = await response.json();
    expect(data[0].excerpt).toBe('');
    expect(data[0].categories).toEqual([]);
  });

  it('should sort posts by date descending', async () => {
    const mockPosts = [
      {
        data: {
          title: 'Older Post',
          datePublished: new Date('2023-01-01'),
          excerpt: 'Old',
        },
        slug: 'older',
      },
      {
        data: {
          title: 'Newer Post',
          datePublished: new Date('2023-01-03'),
          excerpt: 'New',
        },
        slug: 'newer',
      },
    ];

    (getCollection as any).mockResolvedValue(mockPosts);

    const response = await GET();
    const data = await response.json();
    expect(data[0].title).toBe('Newer Post');
    expect(data[1].title).toBe('Older Post');
  });
});
