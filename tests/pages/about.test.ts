import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

describe("about.astro", () => {
  const pagePath = join(process.cwd(), "src/pages/about.astro");
  const pageContent = readFileSync(pagePath, "utf-8");

  it("imports required dependencies", () => {
    expect(pageContent).toContain(
      'import Layout from "../components/Layout.astro"'
    );
    expect(pageContent).toContain(
      'import SocialLinks from "../components/SocialLinks.astro"'
    );
    expect(pageContent).toContain('import { config } from "../config"');
  });

  it("uses config for title and description", () => {
    expect(pageContent).toContain(
      "const { title, description, author } = config;"
    );
    expect(pageContent).toContain(
      "const pageDescription = `Learn more about ${author.name} and the ${title} blog`;"
    );
  });

  it("uses Layout component with proper props", () => {
    expect(pageContent).toContain(
      "<Layout title={`About | ${title}`} description={pageDescription}>"
    );
  });

  it("has page header structure", () => {
    expect(pageContent).toContain('<header class="page-header">');
    expect(pageContent).toContain('<h1 class="page-title">About</h1>');
    expect(pageContent).toContain('<hr class="page-rule" />');
  });

  it("has author section", () => {
    expect(pageContent).toContain('<div class="author-section">');
    expect(pageContent).toContain('<div class="author-avatar">');
  });

  it("includes SocialLinks component", () => {
    expect(pageContent).toContain("<SocialLinks");
  });

  it("has proper semantic HTML elements", () => {
    expect(pageContent).toContain("<header");
    expect(pageContent).toContain("<div");
  });

  it("includes author information from config", () => {
    expect(pageContent).toContain("author.name");
    expect(pageContent).toContain("author.bio");
    expect(pageContent).toContain("author.avatar");
  });
});
