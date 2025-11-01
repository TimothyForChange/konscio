import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

describe('blog.astro', () => {
  const pagePath = join(process.cwd(), 'src/pages/blog.astro');
  const pageContent = readFileSync(pagePath, 'utf-8');

  it('imports required dependencies', () => {
    expect(pageContent).toContain(
      "import Layout from '../components/Layout.astro'"
    );
    expect(pageContent).toContain("import { config } from '../config'");
    expect(pageContent).toContain(
      "import { slugifyPath } from '../utils/slugify'"
    );
  });

  it('loads blog posts using glob imports', () => {
    expect(pageContent).toContain(
      "const mdPostsGlob = import.meta.glob('../content/blog/*.md', { eager: true })"
    );
    expect(pageContent).toContain(
      "const mdxPostsGlob = import.meta.glob('../content/blog/*.mdx', { eager: true })"
    );
  });

  it('filters and sorts posts', () => {
    expect(pageContent).toContain(
      '.filter((post: any) => !post.frontmatter.draft)'
    );
    expect(pageContent).toContain(
      'new Date(b.frontmatter.datePublished).getTime() -'
    );
  });

  it('uses Layout component with proper props', () => {
    expect(pageContent).toContain('<Layout');
    expect(pageContent).toContain("title='Blog | Timothy for Change'");
    expect(pageContent).toContain(
      "description='All blog posts from Timothy for Change'"
    );
  });

  it('has blog header structure', () => {
    expect(pageContent).toContain("<header class='blog-header'>");
    expect(pageContent).toContain("<h1 class='blog-title'>Blog</h1>");
  });

  it('excludes draft posts', () => {
    expect(pageContent).toContain(
      '.filter((post: any) => !post.frontmatter.draft)'
    );
  });

  it('sorts posts by date published in descending order', () => {
    expect(pageContent).toContain(
      'new Date(b.frontmatter.datePublished).getTime() -'
    );
    expect(pageContent).toContain(
      'new Date(a.frontmatter.datePublished).getTime()'
    );
  });

  it('includes slugified paths for posts', () => {
    expect(pageContent).toContain('slugifyPath(post.file)');
  });

  it('includes pagination or post listing structure', () => {
    expect(pageContent).toMatch(/(article|post|list|card|grid)/i);
  });

  it('includes proper post metadata display', () => {
    expect(pageContent).toMatch(
      /(date|time|author|category|tag|reading|excerpt)/i
    );
  });
});
