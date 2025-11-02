import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

describe("comrades.astro", () => {
  const pagePath = join(process.cwd(), "src/pages/comrades.astro");
  const pageContent = readFileSync(pagePath, "utf-8");

  it("uses Layout component with proper props", () => {
    expect(pageContent).toContain(
      '<Layout\n  title="Comrades"\n  description="Ecosocialist and allied movements fighting for climate justice, workers\' power, decolonial liberation, and solidarity across the Global South."\n  showSidebar={false}'
    );
  });

  it("has page header structure", () => {
    expect(pageContent).toContain('<h1 class="page-title">Comrades</h1>');
    expect(pageContent).toContain('<hr class="page-rule" />');
    expect(pageContent).toContain("solidarity-intro");
  });

  it("contains category navigation with anchors", () => {
    const anchors = [
      "#south-africa-and-the-continent",
      "#global-south-solidarity-and-agrarian-movements",
      "#labour-energy-and-economic-justice",
      "#indigenous-resistance-and-land-back",
      "#mutual-aid-and-community-solidarity",
    ];
    anchors.forEach((anchor) => {
      expect(pageContent).toContain(`href="${anchor}"`);
    });
  });

  it("lists key solidarity cards (titles)", () => {
    const titles = [
      "African Climate Alliance",
      "Community Movement Builders",
      "Mutual Aid Disaster Relief",
      "Philly Thrive",
      "La Via Campesina",
      "Cooperation Jackson",
    ];
    titles.forEach((title) => {
      expect(pageContent).toContain(
        `<h3 class="solidarity-title">${title}</h3>`
      );
    });
  });

  it("uses consistent class naming conventions", () => {
    const requiredClasses = [
      "solidarity-page",
      "solidarity-section",
      "solidarity-grid",
      "solidarity-card",
      "solidarity-title",
      "solidarity-description",
      "solidarity-link",
      "category-title",
    ];
    requiredClasses.forEach((cls) => {
      expect(pageContent).toContain(cls);
    });
  });

  it("has accessible external links with aria-labels", () => {
    const ariaPattern =
      /aria-label="[A-Za-z0-9 .:'’,&–\-()]+website — opens in a new tab"/g;
    const matches = pageContent.match(ariaPattern) || [];
    expect(matches.length).toBeGreaterThan(5);
  });

  it("contains multiple solidarity categories", () => {
    const categoryHeadings = (
      pageContent.match(/class="category-title"/g) || []
    ).length;
    expect(categoryHeadings).toBe(5);
  });

  it("has navigation element with proper aria-label", () => {
    expect(pageContent).toContain(
      '<nav class="solidarity-nav" aria-label="Comrades category navigation">'
    );
  });

  it("defines all category section IDs", () => {
    const ids = [
      "south-africa-and-the-continent",
      "global-south-solidarity-and-agrarian-movements",
      "labour-energy-and-economic-justice",
      "indigenous-resistance-and-land-back",
      "mutual-aid-and-community-solidarity",
    ];
    ids.forEach((id) => {
      expect(pageContent).toContain(`id="${id}"`);
    });
  });

  it("each solidarity card has a description and link", () => {
    const cardCount = (
      pageContent.match(/<article class="solidarity-card">/g) || []
    ).length;
    const titleCount = (
      pageContent.match(/<h3 class="solidarity-title">/g) || []
    ).length;
    const descCount = (
      pageContent.match(/<p class="solidarity-description">/g) || []
    ).length;
    const linkCount = (
      pageContent.match(/<a\n            href="https?:\/\//g) || []
    ).length;
    expect(cardCount).toBeGreaterThan(10);
    expect(titleCount).toBe(cardCount);
    expect(descCount).toBe(cardCount);
    expect(linkCount).toBe(cardCount);
  });

  it("all external links open in new tab with security rel", () => {
    const targets = pageContent.match(/target="_blank"/g) || [];
    const rels = pageContent.match(/rel="noopener noreferrer"/g) || [];
    expect(targets.length).toBeGreaterThan(10);
    expect(rels.length).toBe(targets.length);
  });

  it("every solidarity link has an aria-label", () => {
    const links = pageContent.match(/class="solidarity-link"/g) || [];
    const ariaLabels =
      pageContent.match(/aria-label="[^"]+website — opens in a new tab"/g) ||
      [];
    expect(ariaLabels.length).toBe(links.length);
  });

  it("no duplicate solidarity titles", () => {
    const titles = Array.from(
      pageContent.matchAll(/<h3 class="solidarity-title">([^<]+)<\/h3>/g)
    ).map((m) => m[1]);
    const unique = new Set(titles);
    expect(unique.size).toBe(titles.length);
  });
});
