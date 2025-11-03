import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

describe("SolidarityCard.astro", () => {
  const componentPath = join(
    process.cwd(),
    "src/components/SolidarityCard.astro"
  );
  const componentContent = readFileSync(componentPath, "utf-8");

  it("has correct TypeScript interface", () => {
    expect(componentContent).toContain("export interface Props {");
    expect(componentContent).toContain("title: string;");
    expect(componentContent).toContain("description: string;");
    expect(componentContent).toContain("url: string;");
    expect(componentContent).toContain("ariaLabel: string;");
  });

  it("uses props correctly in template", () => {
    expect(componentContent).toContain(
      "const { title, description, url, ariaLabel } = Astro.props;"
    );
    expect(componentContent).toContain("{title}");
    expect(componentContent).toContain("{description}");
    expect(componentContent).toContain("href={url}");
    expect(componentContent).toContain("aria-label={ariaLabel}");
  });

  it("has correct HTML structure", () => {
    expect(componentContent).toContain('<article class="solidarity-card">');
    expect(componentContent).toContain('<h3 class="solidarity-title">');
    expect(componentContent).toContain('<p class="solidarity-description">');
    expect(componentContent).toContain('class="solidarity-link"');
    expect(componentContent).toContain('target="_blank"');
    expect(componentContent).toContain('rel="noopener noreferrer"');
    expect(componentContent).toContain("aria-label={ariaLabel}>Website</a");
  });

  it("includes all required CSS classes in styles", () => {
    const requiredClasses = [
      ".solidarity-card",
      ".solidarity-title",
      ".solidarity-description",
      ".solidarity-link",
    ];

    requiredClasses.forEach((cls) => {
      expect(componentContent).toContain(cls);
    });
  });

  it("has proper hover and focus styles", () => {
    expect(componentContent).toContain(".solidarity-card:hover");
    expect(componentContent).toContain("transform: translateY(-4px)");
    expect(componentContent).toContain(".solidarity-link:hover");
    expect(componentContent).toContain(".solidarity-link:focus");
  });

  it("uses CSS custom properties", () => {
    expect(componentContent).toContain("var(--color-surface)");
    expect(componentContent).toContain("var(--color-border)");
    expect(componentContent).toContain("var(--color-accent)");
    expect(componentContent).toContain("var(--grid-unit)");
    expect(componentContent).toContain("var(--font-heading-secondary)");
  });
});
