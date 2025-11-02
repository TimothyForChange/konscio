import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

describe("categories.astro", () => {
  const pagePath = join(process.cwd(), "src/pages/categories.astro");
  const pageContent = readFileSync(pagePath, "utf-8");

  it("imports required dependencies", () => {
    expect(pageContent).toContain(
      "import Layout from '../components/Layout.astro'"
    );
    expect(pageContent).toContain("import { config } from '../config'");
  });

  it("loads blog posts using glob imports", () => {
    expect(pageContent).toContain(
      "const mdPostsGlob = import.meta.glob('../content/blog/*.md', { eager: true })"
    );
    expect(pageContent).toContain(
      "const mdxPostsGlob = import.meta.glob('../content/blog/*.mdx', { eager: true })"
    );
  });

  it("filters draft posts", () => {
    expect(pageContent).toContain(
      ".filter((post: any) => !post.frontmatter.draft)"
    );
  });

  it("builds category map from posts", () => {
    expect(pageContent).toContain("const allCategories = new Set<string>();");
    expect(pageContent).toContain(
      "const categoryMap: Record<string, any[]> = {};"
    );
  });

  it("uses Layout component with proper props", () => {
    expect(pageContent).toContain("<Layout");
    expect(pageContent).toContain("title='Categories - Timothy for Change'");
    expect(pageContent).toContain("description='Browse articles by category'");
  });

  it("has categories header structure", () => {
    expect(pageContent).toContain("<header class='page-header'>");
    expect(pageContent).toContain("<h1 class='page-title'>Categories</h1>");
  });

  it("excludes draft posts from category calculation", () => {
    expect(pageContent).toContain(
      ".filter((post: any) => !post.frontmatter.draft)"
    );
  });

  it("creates unique category list", () => {
    expect(pageContent).toContain("new Set<string>()");
  });

  it("maps posts to their categories", () => {
    expect(pageContent).toContain(
      "post.frontmatter.categories.includes(category)"
    );
  });

  it("includes category links or navigation", () => {
    expect(pageContent).toMatch(/(link|nav|a href|category)/i);
  });

  it("displays category counts or post numbers", () => {
    expect(pageContent).toMatch(/(count|number|total|length)/i);
  });

  it("includes semantic HTML for category listing", () => {
    expect(pageContent).toMatch(/(ul|li|section|article|grid|list)/i);
  });
});
