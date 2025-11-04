import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

describe("BookmarkNav.astro", () => {
  const componentPath = join(process.cwd(), "src/components/BookmarkNav.astro");
  const componentContent = readFileSync(componentPath, "utf-8");

  it("has correct TypeScript interfaces", () => {
    expect(componentContent).toContain("interface Section {");
    expect(componentContent).toContain("id: string;");
    expect(componentContent).toContain("label: string;");
    expect(componentContent).toContain("interface Props {");
    expect(componentContent).toContain("sections: Section[];");
    expect(componentContent).toContain("ariaLabel?: string;");
  });

  it("uses props correctly in template", () => {
    expect(componentContent).toContain(
      'const { sections, ariaLabel = "Category navigation" } = Astro.props;'
    );
    expect(componentContent).toContain("aria-label={ariaLabel}");
    expect(componentContent).toContain("sections.map((section)");
    expect(componentContent).toContain("href={`#${section.id}`}");
    expect(componentContent).toContain("{section.label}");
  });

  it("has correct HTML structure", () => {
    expect(componentContent).toContain('<nav class="solidarity-nav"');
    expect(componentContent).toContain('<div class="bookmark-container">');
    expect(componentContent).toContain('class="bookmark-toggle"');
    expect(componentContent).toContain(
      '<ul class="bookmark-list" id="bookmark-list">'
    );
    expect(componentContent).toContain("<li>");
    expect(componentContent).toContain(
      "<a href={`#${section.id}`}>{section.label}</a>"
    );
  });

  it("has proper accessibility attributes", () => {
    expect(componentContent).toContain('aria-expanded="false"');
    expect(componentContent).toContain('aria-controls="bookmark-list"');
    expect(componentContent).toContain('aria-hidden="true"');
  });

  it("includes interactive JavaScript", () => {
    expect(componentContent).toContain("<script is:inline>");
    expect(componentContent).toContain(
      'document.addEventListener("DOMContentLoaded"'
    );
    expect(componentContent).toContain(
      'document.querySelector(".bookmark-toggle")'
    );
    expect(componentContent).toContain(
      'document.querySelector(".bookmark-list")'
    );
    expect(componentContent).toContain("aria-expanded");
    expect(componentContent).toContain('classList.toggle("show")');
    expect(componentContent).toContain('classList.remove("show")');
  });

  it("includes all required CSS classes in styles", () => {
    const requiredClasses = [
      ".solidarity-nav",
      ".bookmark-container",
      ".bookmark-toggle",
      ".bookmark-icon",
      ".bookmark-list",
    ];

    requiredClasses.forEach((cls) => {
      expect(componentContent).toContain(cls);
    });
  });

  it("has proper hover and focus styles", () => {
    expect(componentContent).toContain(".bookmark-toggle:hover");
    expect(componentContent).toContain(".bookmark-toggle:focus");
    expect(componentContent).toContain(".bookmark-list a:hover");
    expect(componentContent).toContain(".bookmark-list a:focus");
    expect(componentContent).toContain("transform:");
  });

  it("has responsive design with media queries", () => {
    expect(componentContent).toContain("@media (max-width: 768px)");
    expect(componentContent).toContain("@media (min-width: 769px)");
    expect(componentContent).toContain("display: none");
    expect(componentContent).toContain("display: flex");
  });

  it("uses CSS custom properties", () => {
    expect(componentContent).toContain("var(--color-surface)");
    expect(componentContent).toContain("var(--color-border)");
    expect(componentContent).toContain("var(--color-accent)");
    expect(componentContent).toContain("var(--color-text-primary)");
    expect(componentContent).toContain("var(--color-text-secondary)");
    expect(componentContent).toContain("var(--grid-unit)");
    expect(componentContent).toContain("var(--font-heading-secondary)");
  });

  it("has proper button styling and interaction", () => {
    expect(componentContent).toContain("cursor: pointer");
    expect(componentContent).toContain("transition: all 0.3s ease");
    expect(componentContent).toContain(
      "-webkit-tap-highlight-color: transparent"
    );
    expect(componentContent).toContain("user-select: none");
  });

  it("includes proper list styling", () => {
    expect(componentContent).toContain("list-style: none");
    expect(componentContent).toContain("flex-wrap: wrap");
    expect(componentContent).toContain("justify-content: center");
  });
});
