import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

describe('index.astro', () => {
  const pagePath = join(process.cwd(), 'src/pages/index.astro');
  const pageContent = readFileSync(pagePath, 'utf-8');

  it('imports required dependencies', () => {
    expect(pageContent).toContain(
      "import Layout from '../components/Layout.astro'"
    );
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
    expect(pageContent).toContain(
      "title='Timothy for Change: For People And Planet'"
    );
    expect(pageContent).toContain('showSidebar={false}');
  });

  it('has hero section structure', () => {
    expect(pageContent).toContain("<section class='hero'>");
    expect(pageContent).toContain(
      "<h1 class='hero-title'>Timothy for Change</h1>"
    );
    expect(pageContent).toContain(
      "<a href='#posts' class='btn btn-primary'>View Posts</a>"
    );
  });

  it('has blog section', () => {
    expect(pageContent).toContain("<section class='blog-section' id='posts'>");
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

  it('disables sidebar on homepage', () => {
    expect(pageContent).toContain('showSidebar={false}');
  });

  it('includes recent posts section', () => {
    expect(pageContent).toContain("section-title'>Blog Posts");
  });

  it('includes call-to-action elements', () => {
    expect(pageContent).toMatch(/(button|cta|link|action)/i);
  });

  it('includes site description or tagline', () => {
    expect(pageContent).toMatch(
      /(eco-socialist|decolonial|analysis|planet|people)/i
    );
  });
});
