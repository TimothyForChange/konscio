import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

describe("SEO.astro", () => {
  const componentPath = join(process.cwd(), "src/components/SEO.astro");
  const componentContent = readFileSync(componentPath, "utf-8");

  it("has proper TypeScript interface", () => {
    expect(componentContent).toContain("export interface Props");
    expect(componentContent).toContain("title?: string");
    expect(componentContent).toContain("description?: string");
    expect(componentContent).toContain("image?: string");
    expect(componentContent).toContain("type?: 'website' | 'article'");
    expect(componentContent).toContain("datePublished?: string");
    expect(componentContent).toContain("dateModified?: string");
    expect(componentContent).toContain("categories?: string[]");
    expect(componentContent).toContain("tags?: string[]");
    expect(componentContent).toContain("canonical?: string");
  });

  it("imports required dependencies", () => {
    expect(componentContent).toContain(
      "import { Schema } from 'astro-seo-schema'"
    );
    expect(componentContent).toContain("import { config } from '../config'");
  });

  it("defines ogImageUrl", () => {
    expect(componentContent).toContain(
      "const ogImageUrl = new URL('images/og-image.jpg', Astro.site).toString()"
    );
  });

  it("destructures props with defaults", () => {
    expect(componentContent).toContain("const {");
    expect(componentContent).toContain("title = config.title,");
    expect(componentContent).toContain("description = config.description,");
    expect(componentContent).toContain("image = ogImageUrl,");
    expect(componentContent).toContain("type = 'website',");
    expect(componentContent).toContain("datePublished,");
    expect(componentContent).toContain("dateModified,");
    expect(componentContent).toContain("categories,");
    expect(componentContent).toContain("tags,");
    expect(componentContent).toContain("canonical,");
    expect(componentContent).toContain("} = Astro.props;");
  });

  it("defines pageTitle and URLs", () => {
    expect(componentContent).toContain(
      "const pageTitle = title.includes(config.title)"
    );
    expect(componentContent).toContain("? title");
    expect(componentContent).toContain(": `${title} | ${config.title}`;");
    expect(componentContent).toContain(
      "const canonicalURL = canonical || new URL(Astro.url.pathname, Astro.site);"
    );
    expect(componentContent).toContain(
      "const imageURL = new URL(image.replace(/^\\//, ''), Astro.site);"
    );
  });

  it("includes basic meta tags", () => {
    expect(componentContent).toContain("<title>{pageTitle}</title>");
    expect(componentContent).toContain(
      "<meta name='description' content={description} />"
    );
    expect(componentContent).toContain(
      "<meta name='author' content={config.author.name} />"
    );
    expect(componentContent).toContain(
      "<link rel='canonical' href={canonicalURL} />"
    );
  });

  it("includes Open Graph meta tags", () => {
    expect(componentContent).toContain(
      "<meta property='og:title' content={pageTitle} />"
    );
    expect(componentContent).toContain(
      "<meta property='og:description' content={description} />"
    );
    expect(componentContent).toContain(
      "<meta property='og:type' content={type} />"
    );
    expect(componentContent).toContain(
      "<meta property='og:url' content={canonicalURL} />"
    );
    expect(componentContent).toContain(
      "<meta property='og:image' content={imageURL.toString()} />"
    );
    expect(componentContent).toContain("property='og:logo'");
    expect(componentContent).toContain(
      "content={new URL('/logo.webp', Astro.site).toString()}"
    );
    expect(componentContent).toContain(
      "<meta property='og:site_name' content={config.title} />"
    );
    expect(componentContent).toContain(
      "<meta property='og:locale' content='en_GB' />"
    );
  });

  it("includes article-specific Open Graph tags conditionally", () => {
    expect(componentContent).toContain("datePublished && (");
    expect(componentContent).toContain(
      "<meta property='article:published_time' content={datePublished} />"
    );
    expect(componentContent).toContain("type === 'article' && (");
    expect(componentContent).toContain(
      "<meta property='article:author' content={config.author.name} />"
    );
    expect(componentContent).toContain(
      "<meta property='article:section' content={categories?.[0] || 'Blog'} />"
    );
    expect(componentContent).toContain("dateModified && (");
    expect(componentContent).toContain(
      "<meta property='article:modified_time' content={dateModified} />"
    );
  });

  it("includes Twitter Card meta tags", () => {
    expect(componentContent).toContain(
      "<meta name='twitter:card' content='summary_large_image' />"
    );
    expect(componentContent).toContain(
      "<meta name='twitter:title' content={pageTitle} />"
    );
    expect(componentContent).toContain(
      "<meta name='twitter:description' content={description} />"
    );
    expect(componentContent).toContain(
      "<meta name='twitter:image' content={imageURL.toString()} />"
    );
  });

  it("includes robots meta tags", () => {
    expect(componentContent).toContain(
      "<meta name='robots' content='index, follow' />"
    );
    expect(componentContent).toContain(
      "<meta name='googlebot' content='index, follow' />"
    );
  });

  it("includes Schema.org structured data", () => {
    expect(componentContent).toContain("<Schema");
    expect(componentContent).toContain("item={{");
    expect(componentContent).toContain("'@context': 'https://schema.org'");
    expect(componentContent).toContain(
      "'@type': type === 'article' ? 'Article' : 'WebSite'"
    );
    expect(componentContent).toContain("headline: pageTitle");
    expect(componentContent).toContain("description: description");
    expect(componentContent).toContain("url: canonicalURL.toString()");
    expect(componentContent).toContain("image: imageURL.toString()");
    expect(componentContent).toContain("datePublished: datePublished");
    expect(componentContent).toContain("dateModified: dateModified");
    expect(componentContent).toContain("articleSection: categories[0]");
    expect(componentContent).toContain("keywords: tags.join(', ')");
    expect(componentContent).toContain("author: {");
    expect(componentContent).toContain("'@type': 'Person'");
    expect(componentContent).toContain("name: config.author.name");
    expect(componentContent).toContain("description: config.author.bio");
    expect(componentContent).toContain("image: config.author.avatar");
    expect(componentContent).toContain("publisher: {");
    expect(componentContent).toContain("'@type': 'Organization'");
    expect(componentContent).toContain("logo: {");
    expect(componentContent).toContain("'@type': 'ImageObject'");
    expect(componentContent).toContain(
      "url: new URL('/site-title.svg', Astro.site).toString()"
    );
  });

  it("includes RSS and sitemap links", () => {
    expect(componentContent).toContain("rel='alternate'");
    expect(componentContent).toContain("type='application/rss+xml'");
    expect(componentContent).toContain("title={config.title}");
    expect(componentContent).toContain("href='/rss.xml'");
    expect(componentContent).toContain(
      "<link rel='sitemap' type='application/xml' href='/sitemap-index.xml' />"
    );
  });
});
