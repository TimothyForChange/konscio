import { readFileSync } from "fs";
import { join } from "path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

describe("HeaderNavigation.astro", () => {
  const componentPath = join(
    process.cwd(),
    "src/components/HeaderNavigation.astro"
  );
  const componentContent = readFileSync(componentPath, "utf-8");

  it("has proper TypeScript interface", () => {
    expect(componentContent).toContain("interface Props");
    expect(componentContent).toContain("base: string;");
  });

  it("destructures props correctly", () => {
    expect(componentContent).toContain("const { base } = Astro.props;");
  });

  it("has proper navigation structure", () => {
    expect(componentContent).toContain(
      "<nav class='main-navigation' role='navigation' aria-label='Main navigation'>"
    );
    expect(componentContent).toContain("<ul class='nav-list'>");
    expect(componentContent).toContain("</ul>");
    expect(componentContent).toContain("</nav>");
  });

  it("includes all navigation links", () => {
    expect(componentContent).toContain(
      "<li><a href={base} data-astro-prefetch class='nav-link'>Home</a></li>"
    );
    expect(componentContent).toContain(
      "<a href={base + 'blog'} data-astro-prefetch class='nav-link'>Blog</a>"
    );
    expect(componentContent).toContain(
      "<a href={base + 'categories'} data-astro-prefetch class='nav-link'"
    );
    expect(componentContent).toContain(">Categories</a");
    expect(componentContent).toContain(
      "<a href={base + 'about'} data-astro-prefetch class='nav-link'>About</a>"
    );
  });

  it("includes proper CSS classes and styles", () => {
    expect(componentContent).toContain(".main-navigation");
    expect(componentContent).toContain("flex-shrink: 0;");
    expect(componentContent).toContain(".nav-list");
    expect(componentContent).toContain("display: flex;");
    expect(componentContent).toContain("list-style: none;");
    expect(componentContent).toContain("gap: calc(var(--grid-unit) * 3);");
    expect(componentContent).toContain(".nav-link");
    expect(componentContent).toContain(
      "font-family: var(--font-heading-secondary);"
    );
    expect(componentContent).toContain("font-weight: 700;");
    expect(componentContent).toContain("text-transform: uppercase;");
    expect(componentContent).toContain("color: var(--color-text-primary);");
    expect(componentContent).toContain("border-bottom: 2px solid transparent;");
    expect(componentContent).toContain("transition: all 0.2s ease;");
  });

  it("includes hover and focus styles", () => {
    expect(componentContent).toContain(".nav-link:hover,");
    expect(componentContent).toContain(".nav-link:focus");
    expect(componentContent).toContain("color: var(--color-accent);");
    expect(componentContent).toContain(
      "border-bottom-color: var(--color-accent);"
    );
    expect(componentContent).toContain("text-decoration: none;");
  });

  it("includes responsive styles", () => {
    expect(componentContent).toContain("@media (max-width: 768px)");
    expect(componentContent).toContain("display: none;");
  });

  it("renders with correct base path", async () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <body>
        <nav class="main-navigation" role="navigation" aria-label="Main navigation">
          <ul class="nav-list">
            <li><a href="/test-base" data-astro-prefetch class="nav-link">Home</a></li>
            <a href="/test-base/blog" data-astro-prefetch class="nav-link">Blog</a>
            <a href="/test-base/categories" data-astro-prefetch class="nav-link">Categories</a>
            <a href="/test-base/about" data-astro-prefetch class="nav-link">About</a>
          </ul>
        </nav>
      </body>
      </html>
    `;

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const homeLink = document.querySelector('.nav-link[href="/test-base"]');
    const blogLink = document.querySelector(
      '.nav-link[href="/test-base/blog"]'
    );
    const categoriesLink = document.querySelector(
      '.nav-link[href="/test-base/categories"]'
    );
    const aboutLink = document.querySelector(
      '.nav-link[href="/test-base/about"]'
    );

    expect(homeLink).not.toBeNull();
    expect(blogLink).not.toBeNull();
    expect(categoriesLink).not.toBeNull();
    expect(aboutLink).not.toBeNull();
  });

  it("includes data-astro-prefetch on all navigation links", () => {
    expect(componentContent).toContain("data-astro-prefetch class='nav-link'");
  });

  it("has correct role and aria-label attributes", () => {
    expect(componentContent).toContain("role='navigation'");
    expect(componentContent).toContain("aria-label='Main navigation'");
  });
});
