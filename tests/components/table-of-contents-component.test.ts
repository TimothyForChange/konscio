import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

describe("TableOfContents.astro", () => {
  it("contains conditional rendering logic", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/TableOfContents.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain("headings.length > 0");
    expect(componentContent).toContain("{headings.map((heading) => (");
    expect(componentContent).toContain("href={`#${heading.slug}`");
  });

  it("has proper TypeScript interface", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/TableOfContents.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain("interface Props");
    expect(componentContent).toContain("headings: Heading[]");
    expect(componentContent).toContain("const { headings } = Astro.props");
  });

  it("has proper styling classes", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/TableOfContents.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain(".table-of-contents");
    expect(componentContent).toContain(".toc-title");
    expect(componentContent).toContain(".toc-list");
    expect(componentContent).toContain(".toc-link");
    expect(componentContent).toContain("toc-level-3");
  });

  it("includes client-side script for smooth scrolling", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/TableOfContents.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain("DOMContentLoaded");
    expect(componentContent).toContain("scrollIntoView");
    expect(componentContent).toContain("IntersectionObserver");
    expect(componentContent).toContain("pushState");
    expect(componentContent).toContain('behavior: "smooth"');
  });

  it("has active link styling", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/TableOfContents.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain(".toc-link.active");
    expect(componentContent).toContain("font-weight: 600");
  });

  it("has responsive design", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/TableOfContents.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain("@media (max-width: 768px)");
    expect(componentContent).toContain("padding: calc(var(--grid-unit) * 2)");
  });
});
