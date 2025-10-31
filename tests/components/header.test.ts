import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

describe('Header.astro', () => {
  const componentPath = join(process.cwd(), 'src/components/Header.astro');
  const componentContent = readFileSync(componentPath, 'utf-8');

  it('imports required dependencies', () => {
    expect(componentContent).toContain("import { config } from '../config'");
    expect(componentContent).toContain(
      "import HeaderMobileMenu from './HeaderMobileMenu.astro'"
    );
    expect(componentContent).toContain(
      "import HeaderNavigation from './HeaderNavigation.astro'"
    );
    expect(componentContent).toContain(
      "import HeaderSearch from './HeaderSearch.astro'"
    );
    expect(componentContent).toContain(
      "import ThemeToggle from './ThemeToggle.astro'"
    );
  });

  it('destructures props with defaults', () => {
    expect(componentContent).toContain(
      "const { base = '' } = Astro.site ? { base: config.baseUrl } : { base: '' };"
    );
  });

  it('has proper header structure', () => {
    expect(componentContent).toContain("<header class='site-header'>");
    expect(componentContent).toContain("<div class='header-content'>");
    expect(componentContent).toContain("<div class='site-title'>");
    expect(componentContent).toContain("<div class='header-controls'>");
    expect(componentContent).toContain('</div>');
    expect(componentContent).toContain('</header>');
  });

  it('includes hamburger toggle button', () => {
    expect(componentContent).toContain("class='hamburger-toggle mobile-only'");
    expect(componentContent).toContain("id='hamburger-toggle'");
    expect(componentContent).toContain("aria-label='Toggle navigation menu'");
    expect(componentContent).toContain("aria-expanded='false'");
    expect(componentContent).toContain('<svg');
    expect(componentContent).toContain("viewBox='0 0 24 24'");
    expect(componentContent).toContain("class='hamburger-line'");
    expect(componentContent).toContain("d='M3 6h18'");
  });

  it('includes site title with logo', () => {
    expect(componentContent).toContain('<a href={base} data-astro-prefetch>');
    expect(componentContent).toContain("src={base + 'site-title.svg'}");
    expect(componentContent).toContain('alt={config.title}');
    expect(componentContent).toContain("class='title-svg'");
    expect(componentContent).toContain("width='280'");
    expect(componentContent).toContain("height='48'");
  });

  it('includes HeaderNavigation component', () => {
    expect(componentContent).toContain('<HeaderNavigation base={base} />');
  });

  it('includes mobile controls', () => {
    expect(componentContent).toContain("<div class='mobile-controls'>");
    expect(componentContent).toContain('<ThemeToggle />');
    expect(componentContent).toContain("href={base + 'rss.xml'}");
    expect(componentContent).toContain('data-astro-prefetch');
    expect(componentContent).toContain("class='rss-toggle'");
    expect(componentContent).toContain("title='RSS Feed'");
    expect(componentContent).toContain("class='search-toggle'");
    expect(componentContent).toContain("id='search-toggle'");
    expect(componentContent).toContain("aria-label='Search articles'");
  });

  it('includes RSS icon', () => {
    expect(componentContent).toContain(
      "<circle cx='5' cy='19' r='2' fill='currentColor'></circle>"
    );
    expect(componentContent).toContain('M3 3v2c8.284 0 15 6.716 15 15h2');
    expect(componentContent).toContain('M3 9v2c4.963 0 9 4.037 9 9h2');
  });

  it('includes search icon', () => {
    expect(componentContent).toContain("cx='11'");
    expect(componentContent).toContain("cy='11'");
    expect(componentContent).toContain("r='8'");
    expect(componentContent).toContain("d='M21 21l-4.35-4.35'");
  });

  it('includes HeaderMobileMenu and HeaderSearch components', () => {
    expect(componentContent).toContain('<HeaderMobileMenu base={base} />');
    expect(componentContent).toContain('<HeaderSearch />');
  });

  it('includes hamburger menu script', () => {
    expect(componentContent).toContain('<script>');
    expect(componentContent).toContain('function initHamburgerMenu()');
    expect(componentContent).toContain(
      "document.getElementById('hamburger-toggle')"
    );
    expect(componentContent).toContain(
      "document.getElementById('mobile-menu')"
    );
    expect(componentContent).toContain("addEventListener('click'");
    expect(componentContent).toContain("addEventListener('keydown'");
    expect(componentContent).toContain('DOMContentLoaded');
  });

  it('includes proper CSS classes and styles', () => {
    expect(componentContent).toContain('.site-header');
    expect(componentContent).toContain(
      'background-color: var(--color-surface);'
    );
    expect(componentContent).toContain(
      'border-bottom: 2px solid var(--color-border);'
    );
    expect(componentContent).toContain('position: sticky;');
    expect(componentContent).toContain('top: 0;');
    expect(componentContent).toContain('z-index: 100;');
    expect(componentContent).toContain('.header-content');
    expect(componentContent).toContain('display: flex;');
    expect(componentContent).toContain('justify-content: space-between;');
    expect(componentContent).toContain('.site-title a');
    expect(componentContent).toContain('line-height: 0;');
    expect(componentContent).toContain('.title-svg');
    expect(componentContent).toContain('height: 48px;');
    expect(componentContent).toContain('max-width: 280px;');
  });

  it('includes accessibility features', () => {
    expect(componentContent).toContain('aria-label=');
    expect(componentContent).toContain('aria-expanded=');
    expect(componentContent).toContain('aria-hidden=');
  });

  it('includes proper semantic HTML', () => {
    expect(componentContent).toContain('<header');
    expect(componentContent).toContain('<button');
    expect(componentContent).toContain('<a href=');
  });

  it('includes button styles', () => {
    expect(componentContent).toContain('.search-toggle');
    expect(componentContent).toContain('.hamburger-toggle');
    expect(componentContent).toContain('.rss-toggle');
    expect(componentContent).toContain('background: none;');
    expect(componentContent).toContain('border: none;');
    expect(componentContent).toContain('cursor: pointer;');
    expect(componentContent).toContain('transition: color 0.2s ease;');
  });

  it('includes hover and focus styles', () => {
    expect(componentContent).toContain('.search-toggle:hover');
    expect(componentContent).toContain('.search-toggle:focus');
    expect(componentContent).toContain('.hamburger-toggle:hover');
    expect(componentContent).toContain('.hamburger-toggle:focus');
    expect(componentContent).toContain('.rss-toggle:hover');
    expect(componentContent).toContain('.rss-toggle:focus');
    expect(componentContent).toContain('color: var(--color-accent);');
    expect(componentContent).toContain('outline: none;');
  });

  it('includes visually hidden class', () => {
    expect(componentContent).toContain('.visually-hidden');
    expect(componentContent).toContain('position: absolute;');
    expect(componentContent).toContain('width: 1px;');
    expect(componentContent).toContain('height: 1px;');
    expect(componentContent).toContain('clip: rect(0, 0, 0, 0);');
  });

  it('includes responsive styles', () => {
    expect(componentContent).toContain('@media (max-width: 768px)');
    expect(componentContent).toContain('grid-template-columns: 1fr auto 1fr;');
    expect(componentContent).toContain('justify-self: start;');
    expect(componentContent).toContain('justify-self: center;');
    expect(componentContent).toContain('justify-self: end;');
    expect(componentContent).toContain('height: 36px;');
    expect(componentContent).toContain('max-width: 180px;');
  });

  it('includes extra small screen styles', () => {
    expect(componentContent).toContain('@media (max-width: 480px)');
    expect(componentContent).toContain(
      'gap: calc(var(--grid-unit)) !important;'
    );
  });
});
