import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

describe("Accessibility Tests", () => {
  it("Header component has proper accessibility attributes", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/HeaderNavigation.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain('role="navigation"');
    expect(componentContent).toContain('aria-label="Main navigation"');
  });

  it("HeaderMobileMenu component has proper accessibility attributes", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/HeaderMobileMenu.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain('aria-label="Mobile navigation"');
  });

  it("Footer component has proper accessibility attributes", () => {
    const componentPath = join(process.cwd(), "src/components/Footer.astro");
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain("<footer");
  });

  it("SocialLinks component has proper accessibility attributes", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/SocialLinks.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain('aria-label="GitHub"');
    expect(componentContent).toContain('aria-label="Instagram"');
    expect(componentContent).toContain('aria-label="Threads"');
    expect(componentContent).toContain('aria-label="Email"');
    expect(componentContent).toContain('target="_blank"');
    expect(componentContent).toContain('rel="noopener noreferrer"');
  });

  it("Search component has proper accessibility attributes", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/HeaderSearch.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain('aria-label="Search articles"');
    expect(componentContent).toContain('aria-label="Close search"');
    expect(componentContent).toContain('autocomplete="off"');
  });

  it("Sidebar component has proper accessibility attributes", () => {
    const componentPath = join(process.cwd(), "src/components/Sidebar.astro");
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain('role="complementary"');
    expect(componentContent).toContain('aria-label="Sidebar"');
  });

  it("TableOfContents component has proper accessibility attributes", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/TableOfContents.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain('<nav class="table-of-contents"');
  });

  it("Pages have proper semantic structure", () => {
    const layoutPath = join(process.cwd(), "src/components/Layout.astro");
    const layoutContent = readFileSync(layoutPath, "utf-8");

    expect(layoutContent).toContain("<main");
    expect(layoutContent).toContain('class="main-content"');

    const aboutPath = join(process.cwd(), "src/pages/about.astro");
    const aboutContent = readFileSync(aboutPath, "utf-8");

    expect(aboutContent).toContain('<header class="page-header"');
    expect(aboutContent).toContain('<h1 class="page-title"');
  });

  it("Components use semantic HTML elements appropriately", () => {
    const componentPath = join(process.cwd(), "src/components/Layout.astro");
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain("<main");
    expect(componentContent).toContain("import Footer from");
    expect(componentContent).toContain("<Footer />");
  });

  it("Form elements have proper labels", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/HeaderSearch.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain("<input");
    expect(componentContent).toContain('aria-label="Search articles"');
    expect(componentContent).toContain('aria-label="Close search"');
  });
});
