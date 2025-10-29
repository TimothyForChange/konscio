import { describe, expect, it } from 'vitest';
import {
  extractHeadings,
  filterHeadingsForTOC,
} from '../../src/utils/table-of-contents';

describe('extractHeadings', () => {
  it('should extract headings from markdown', () => {
    const content = `
# Heading 1
Some text
## Heading 2
More text
### Heading 3
Even more
#### Heading 4
`;

    const headings = extractHeadings(content);
    expect(headings).toEqual([
      { depth: 1, text: 'Heading 1', slug: 'heading-1' },
      { depth: 2, text: 'Heading 2', slug: 'heading-2' },
      { depth: 3, text: 'Heading 3', slug: 'heading-3' },
      { depth: 4, text: 'Heading 4', slug: 'heading-4' },
    ]);
  });

  it('should ignore frontmatter', () => {
    const content = `---
title: Test
---
# Heading 1
## Heading 2
`;

    const headings = extractHeadings(content);
    expect(headings).toEqual([
      { depth: 1, text: 'Heading 1', slug: 'heading-1' },
      { depth: 2, text: 'Heading 2', slug: 'heading-2' },
    ]);
  });

  it('should handle headings with special characters', () => {
    const content = '## Heading with !@#$%^&*()';
    const headings = extractHeadings(content);
    expect(headings[0].slug).toBe('heading-with');
  });

  it('should return empty array for no headings', () => {
    const content = 'Just some text without headings.';
    const headings = extractHeadings(content);
    expect(headings).toEqual([]);
  });

  it('should handle malformed frontmatter', () => {
    const content = `---
title: Test
unclosed frontmatter
# Heading 1
`;
    const headings = extractHeadings(content);
    expect(headings).toEqual([
      { depth: 1, text: 'Heading 1', slug: 'heading-1' },
    ]);
  });

  it('should handle headings with invalid depths', () => {
    const content = `
####### Invalid Heading
# Valid Heading
`;
    const headings = extractHeadings(content);
    expect(headings).toEqual([
      { depth: 1, text: 'Valid Heading', slug: 'valid-heading' },
    ]);
  });
});

describe('filterHeadingsForTOC', () => {
  it('should filter headings to only depth 2 and 3', () => {
    const headings = [
      { depth: 1, text: 'H1', slug: 'h1' },
      { depth: 2, text: 'H2', slug: 'h2' },
      { depth: 3, text: 'H3', slug: 'h3' },
      { depth: 4, text: 'H4', slug: 'h4' },
    ];

    const filtered = filterHeadingsForTOC(headings);
    expect(filtered).toEqual([
      { depth: 2, text: 'H2', slug: 'h2' },
      { depth: 3, text: 'H3', slug: 'h3' },
    ]);
  });

  it('should return empty array if no matching depths', () => {
    const headings = [
      { depth: 1, text: 'H1', slug: 'h1' },
      { depth: 4, text: 'H4', slug: 'h4' },
    ];

    const filtered = filterHeadingsForTOC(headings);
    expect(filtered).toEqual([]);
  });

  it('should handle empty array', () => {
    const filtered = filterHeadingsForTOC([]);
    expect(filtered).toEqual([]);
  });
});
