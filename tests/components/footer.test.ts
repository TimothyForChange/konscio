import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

describe('Footer.astro', () => {
  const componentPath = join(process.cwd(), 'src/components/Footer.astro');
  const componentContent = readFileSync(componentPath, 'utf-8');

  it('imports required dependencies', () => {
    expect(componentContent).toContain("import { config } from '../config'");
    expect(componentContent).toContain(
      "import SocialLinks from './SocialLinks.astro'"
    );
  });

  it('defines currentYear', () => {
    expect(componentContent).toContain(
      'const currentYear = new Date().getFullYear();'
    );
  });

  it('has proper footer structure', () => {
    expect(componentContent).toContain("<footer class='site-footer'>");
    expect(componentContent).toContain("<div class='footer-content'>");
    expect(componentContent).toContain("<div class='footer-info'>");
    expect(componentContent).toContain('<SocialLinks />');
    expect(componentContent).toContain('</div>');
    expect(componentContent).toContain('</footer>');
  });

  it('includes copyright information', () => {
    expect(componentContent).toContain("<p class='copyright'>");
    expect(componentContent).toContain('© {currentYear}');
    expect(componentContent).toContain('{config.author.name}');
    expect(componentContent).toContain('Licensed under');
    expect(componentContent).toContain('CC0 1.0 Universal');
  });

  it('includes source code link', () => {
    expect(componentContent).toContain("<p class='source-code'>");
    expect(componentContent).toContain('Source Code on GitHub');
    expect(componentContent).toContain(
      'https://github.com/timothyforchange/konscio'
    );
  });

  it('includes privacy policy link', () => {
    expect(componentContent).toContain("<p class='privacy-link'");
    expect(componentContent).toContain('data-astro-prefetch');
    expect(componentContent).toContain('/privacy-policy');
    expect(componentContent).toContain('Privacy Policy');
  });

  it('includes Ko-fi support button', () => {
    expect(componentContent).toContain("<div class='kofi-support'>");
    expect(componentContent).toContain('https://ko-fi.com/T6T31HRCAR');
    expect(componentContent).toContain(
      'https://storage.ko-fi.com/cdn/kofi6.png?v=6'
    );
    expect(componentContent).toContain('Buy Me a Coffee at ko-fi.com');
    expect(componentContent).toContain("target='_blank'");
    expect(componentContent).toContain("rel='noopener'");
  });

  it('includes proper CSS classes and styles', () => {
    expect(componentContent).toContain('.site-footer');
    expect(componentContent).toContain(
      'background-color: var(--color-surface);'
    );
    expect(componentContent).toContain(
      'border-top: 2px solid var(--color-border);'
    );
    expect(componentContent).toContain('margin-top: auto;');
    expect(componentContent).toContain('.footer-content');
    expect(componentContent).toContain('display: flex;');
    expect(componentContent).toContain('justify-content: space-between;');
    expect(componentContent).toContain('.footer-info');
    expect(componentContent).toContain('flex-direction: column;');
    expect(componentContent).toContain('.copyright');
    expect(componentContent).toContain('.source-code');
    expect(componentContent).toContain('.privacy-link');
    expect(componentContent).toContain('.kofi-support');
    expect(componentContent).toContain('color: var(--color-text-muted);');
    expect(componentContent).toContain('color: var(--color-accent);');
  });

  it('includes hover and focus styles for links', () => {
    expect(componentContent).toContain('.copyright a:hover');
    expect(componentContent).toContain('.copyright a:focus');
    expect(componentContent).toContain('.source-code a:hover');
    expect(componentContent).toContain('.source-code a:focus');
    expect(componentContent).toContain('.privacy-link a:hover');
    expect(componentContent).toContain('.privacy-link a:focus');
    expect(componentContent).toContain('.kofi-support a:hover img');
    expect(componentContent).toContain('.kofi-support a:focus img');
    expect(componentContent).toContain('color: var(--color-text-primary);');
    expect(componentContent).toContain('text-decoration: none;');
    expect(componentContent).toContain('opacity: 0.8;');
  });

  it('includes responsive styles', () => {
    expect(componentContent).toContain('@media (max-width: 768px)');
    expect(componentContent).toContain('order: 1;');
  });
});
