import { describe, expect, it } from 'vitest';
import { blogSchema } from '../src/schemas/blog';

describe('blog collection schema', () => {
  it('should validate valid blog post data', () => {
    const validData = {
      title: 'Test Post',
      description: 'A test description',
      datePublished: '2023-01-01',
      dateModified: '2023-01-02',
      excerpt: 'Short excerpt',
      categories: ['category1', 'category2'],
      tags: ['tag1', 'tag2'],
      author: 'Test Author',
      image: '/path/to/image.jpg',
    };

    expect(() => blogSchema.parse(validData)).not.toThrow();
  });

  it('should require title and datePublished', () => {
    const invalidData = {
      description: 'Missing title and date',
    };

    expect(() => blogSchema.parse(invalidData)).toThrow();
  });

  it('should coerce date strings to Date objects', () => {
    const dataWithStringDate = {
      title: 'Test',
      datePublished: '2023-01-01',
    };

    const parsed = blogSchema.parse(dataWithStringDate);
    expect(parsed.datePublished).toBeInstanceOf(Date);
  });

  it('should set defaults for optional fields', () => {
    const minimalData = {
      title: 'Minimal Post',
      datePublished: '2023-01-01',
    };

    const parsed = blogSchema.parse(minimalData);
    expect(parsed.categories).toEqual([]);
    expect(parsed.tags).toEqual([]);
    expect(parsed.author).toBe('Anonymous');
  });

  it('should reject invalid date', () => {
    const invalidDateData = {
      title: 'Test',
      datePublished: 'invalid-date',
    };

    expect(() => blogSchema.parse(invalidDateData)).toThrow();
  });
});
