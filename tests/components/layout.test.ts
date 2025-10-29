import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';

describe('Layout.astro', () => {
  const componentPath = join(process.cwd(), 'src/components/Layout.astro');
  const componentContent = readFileSync(componentPath, 'utf-8');

  it('has proper TypeScript interface', () => {
    expect(componentContent).toContain('export interface Props');
    expect(componentContent).toContain('title: string');
    expect(componentContent).toContain('description?: string');
    expect(componentContent).toContain('showSidebar?: boolean');
    expect(componentContent).toContain('image?: string');
    expect(componentContent).toContain("type?: 'website' | 'article'");
    expect(componentContent).toContain('datePublished?: string');
    expect(componentContent).toContain('dateModified?: string');
    expect(componentContent).toContain('canonical?: string');
  });

  it('imports required dependencies', () => {
    expect(componentContent).toContain(
      "import '@fontsource-variable/jetbrains-mono'"
    );
    expect(componentContent).toContain("import '@fontsource-variable/oswald'");
    expect(componentContent).toContain(
      "import '@fontsource-variable/work-sans'"
    );
    expect(componentContent).toContain(
      "import 'remixicon/fonts/remixicon.css'"
    );
    expect(componentContent).toContain("import '../styles/global.css'");
    expect(componentContent).toContain("import Footer from './Footer.astro'");
    expect(componentContent).toContain("import Header from './Header.astro'");
    expect(componentContent).toContain("import SEO from './SEO.astro'");
    expect(componentContent).toContain("import Sidebar from './Sidebar.astro'");
  });

  it('destructures props correctly', () => {
    expect(componentContent).toContain('const {');
    expect(componentContent).toContain('title,');
    expect(componentContent).toContain('description,');
    expect(componentContent).toContain('showSidebar = true,');
    expect(componentContent).toContain('image,');
    expect(componentContent).toContain('type,');
    expect(componentContent).toContain('datePublished,');
    expect(componentContent).toContain('dateModified,');
    expect(componentContent).toContain('canonical,');
    expect(componentContent).toContain('} = Astro.props;');
  });

  it('has proper HTML document structure', () => {
    expect(componentContent).toContain('<!doctype html>');
    expect(componentContent).toContain("<html lang='en'");
    expect(componentContent).toContain('data-disable-dark-theme');
    expect(componentContent).toContain('<head>');
    expect(componentContent).toContain("<meta charset='UTF-8' />");
    expect(componentContent).toContain(
      "<meta name='viewport' content='width=device-width, initial-scale=1.0' />"
    );
    expect(componentContent).toContain('<body>');
    expect(componentContent).toContain("<div class='site-wrapper'>");
    expect(componentContent).toContain(
      "<main class='main-content' class:list={{ 'with-sidebar': showSidebar }}>"
    );
    expect(componentContent).toContain('<slot />');
    expect(componentContent).toContain('</body>');
    expect(componentContent).toContain('</html>');
  });

  it('includes favicon and manifest links', () => {
    expect(componentContent).toContain(
      "<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />"
    );
    expect(componentContent).toContain(
      "<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />"
    );
    expect(componentContent).toContain(
      "<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />"
    );
    expect(componentContent).toContain(
      "<link rel='manifest' href='/site.webmanifest' />"
    );
    expect(componentContent).toContain(
      "<link rel='sitemap' href='/sitemap-index.xml' />"
    );
  });

  it('includes theme initialization script', () => {
    expect(componentContent).toContain('<script>');
    expect(componentContent).toContain('(function () {');
    expect(componentContent).toContain("let theme = 'light';");
    expect(componentContent).toContain(
      "const stored = localStorage.getItem('theme');"
    );
    expect(componentContent).toContain(
      "if (stored === 'light' || stored === 'dark') {"
    );
    expect(componentContent).toContain('window.matchMedia &&');
    expect(componentContent).toContain(
      "window.matchMedia('(prefers-color-scheme: dark)').matches"
    );
    expect(componentContent).toContain(
      'document.documentElement.dataset.theme = theme;'
    );
    expect(componentContent).toContain('})();');
    expect(componentContent).toContain('</script>');
  });

  it('includes SEO component with props', () => {
    expect(componentContent).toContain('<SEO');
    expect(componentContent).toContain('title={title}');
    expect(componentContent).toContain('description={description}');
    expect(componentContent).toContain('image={image}');
    expect(componentContent).toContain('type={type}');
    expect(componentContent).toContain('datePublished={datePublished}');
    expect(componentContent).toContain('dateModified={dateModified}');
    expect(componentContent).toContain('canonical={canonical}');
    expect(componentContent).toContain('/>');
  });

  it('includes Header, Footer, and conditional Sidebar', () => {
    expect(componentContent).toContain(
      '<Header disableDarkTheme={disableDarkTheme} />'
    );
    expect(componentContent).toContain('<Footer />');
    expect(componentContent).toContain('showSidebar && (');
    expect(componentContent).toContain("<aside class='sidebar'>");
    expect(componentContent).toContain('<Sidebar />');
    expect(componentContent).toContain('</aside>');
    expect(componentContent).toContain(')');
    expect(componentContent).toContain('}');
  });

  it('has proper CSS classes and responsive grid', () => {
    expect(componentContent).toContain('.site-wrapper');
    expect(componentContent).toContain('display: flex;');
    expect(componentContent).toContain('flex-direction: column;');
    expect(componentContent).toContain('min-height: 100vh;');
    expect(componentContent).toContain('.main-content');
    expect(componentContent).toContain('.main-content.with-sidebar');
    expect(componentContent).toContain('grid-template-columns: 1fr;');
    expect(componentContent).toContain(
      'grid-template-columns: var(--sidebar-width) 1fr;'
    );
    expect(componentContent).toContain('@media (min-width: 1024px)');
  });
});
