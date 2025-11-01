import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

describe('privacy-policy.astro', () => {
  const pagePath = join(process.cwd(), 'src/pages/privacy-policy.astro');
  const pageContent = readFileSync(pagePath, 'utf-8');

  it('imports required dependencies', () => {
    expect(pageContent).toContain(
      "import Layout from '../components/Layout.astro'"
    );
    expect(pageContent).toContain("import { config } from '../config'");
  });

  it('uses config for title', () => {
    expect(pageContent).toContain('const { title } = config;');
    expect(pageContent).toContain(
      'const pageDescription = `Privacy policy for ${title}`;'
    );
  });

  it('uses Layout component with proper props', () => {
    expect(pageContent).toContain('<Layout');
    expect(pageContent).toContain('title={`Privacy Policy | ${title}`}');
    expect(pageContent).toContain('description={pageDescription}');
    expect(pageContent).toContain('showSidebar={false}');
  });

  it('has page header structure', () => {
    expect(pageContent).toContain("<header class='page-header'>");
    expect(pageContent).toContain("<h1 class='page-title'>Privacy Policy</h1>");
    expect(pageContent).toContain("<hr class='page-rule' />");
  });

  it('has content section with last updated', () => {
    expect(pageContent).toContain("<div class='content-section'>");
    expect(pageContent).toContain(
      "<p class='last-updated'>Last updated: 27 October 2025</p>"
    );
  });

  it('includes proper semantic structure', () => {
    expect(pageContent).toContain('<header');
    expect(pageContent).toContain('<div');
    expect(pageContent).toContain('<h2');
    expect(pageContent).toContain('<p');
    expect(pageContent).toContain('<ul');
    expect(pageContent).toContain('<li');
  });

  it('hides sidebar as expected', () => {
    expect(pageContent).toContain('showSidebar={false}');
  });

  it('includes relevant privacy policy sections', () => {
    expect(pageContent).toMatch(
      /(information|data|cookies|rights|contact|policy)/i
    );
  });
});
