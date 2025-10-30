import { describe, expect, it } from 'vitest';

describe('Categories.astro', () => {
  function getCategories(posts: any[]) {
    const allPosts = posts.filter(
      (post: any) => post && post.frontmatter && !post.frontmatter.draft
    );
    const categories = [
      ...new Set(
        allPosts.flatMap((post: any) => post.frontmatter?.categories || [])
      ),
    ];
    return categories;
  }

  it('extracts unique categories from posts', () => {
    const mockPosts = [
      {
        frontmatter: {
          categories: ['Environment', 'Africa'],
          draft: false,
        },
      },
      {
        frontmatter: {
          categories: ['Politics', 'Africa'],
          draft: false,
        },
      },
      {
        frontmatter: {
          categories: ['Environment'],
          draft: false,
        },
      },
      {
        frontmatter: {
          categories: [],
          draft: false,
        },
      },
      {
        frontmatter: {
          draft: true,
        },
      },
    ];

    const categories = getCategories(mockPosts);
    expect(categories).toEqual(['Environment', 'Africa', 'Politics']);
  });

  it('returns empty array when no posts', () => {
    const categories = getCategories([]);
    expect(categories).toEqual([]);
  });

  it('filters out draft posts', () => {
    const mockPosts = [
      {
        frontmatter: {
          categories: ['Test'],
          draft: false,
        },
      },
      {
        frontmatter: {
          categories: ['Draft'],
          draft: true,
        },
      },
    ];

    const categories = getCategories(mockPosts);
    expect(categories).toEqual(['Test']);
  });

  it('handles posts without categories', () => {
    const mockPosts = [
      {
        frontmatter: {
          draft: false,
        },
      },
    ];

    const categories = getCategories(mockPosts);
    expect(categories).toEqual([]);
  });

  it('handles undefined categories', () => {
    const mockPosts = [
      {
        frontmatter: {
          categories: undefined,
          draft: false,
        },
      },
    ];

    const categories = getCategories(mockPosts);
    expect(categories).toEqual([]);
  });

  it('handles posts with null categories', () => {
    const mockPosts = [
      {
        frontmatter: {
          categories: null as any,
          draft: false,
        },
      },
    ];

    const categories = getCategories(mockPosts);
    expect(categories).toEqual([]);
  });

  it('handles posts with non-array categories', () => {
    const mockPosts = [
      {
        frontmatter: {
          categories: 'not-an-array',
          draft: false,
        },
      },
    ];

    const categories = getCategories(mockPosts);
    expect(categories).toEqual(['not-an-array']);
  });

  it('handles posts with invalid frontmatter structure', () => {
    const mockPosts = [
      {
        title: 'No Frontmatter Post',
      } as any,
    ];

    const categories = getCategories(mockPosts);
    expect(categories).toEqual([]);
  });

  it('handles posts with null or undefined frontmatter', () => {
    const mockPosts = [
      {
        frontmatter: null as any,
      },
      {
        frontmatter: undefined as any,
      },
    ];

    const categories = getCategories(mockPosts);
    expect(categories).toEqual([]);
  });
});
