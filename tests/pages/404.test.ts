import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

describe('404.astro', () => {
  const pagePath = join(process.cwd(), 'src/pages/404.astro');
  const pageContent = readFileSync(pagePath, 'utf-8');

  it('imports required dependencies', () => {
    expect(pageContent).toContain(
      "import Layout from '../components/Layout.astro'"
    );
  });

  it('defines title and description', () => {
    expect(pageContent).toContain("const title = 'Page Not Found';");
    expect(pageContent).toContain(
      "const description = 'Sorry, the page you are looking for does not exist.';"
    );
  });

  it('uses Layout component with proper props', () => {
    expect(pageContent).toContain(
      '<Layout title={title} description={description} showSidebar={false}>'
    );
  });

  it('has not-found section structure', () => {
    expect(pageContent).toContain("<section class='not-found'>");
    expect(pageContent).toContain('<h1>404</h1>');
    expect(pageContent).toContain(
      '<p>Sorry, the page you are looking for does not exist.</p>'
    );
  });

  it('has action links', () => {
    expect(pageContent).toContain(
      "<a href='/' class='notfound-link'>Go to Home</a>"
    );
    expect(pageContent).toContain(
      "onclick='window.history.back();return false;'>Go Back</a"
    );
  });

  it('has noindex meta tag', () => {
    expect(pageContent).toContain(
      "<meta name='robots' content='noindex, nofollow' />"
    );
  });
});
