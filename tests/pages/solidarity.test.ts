import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

describe("solidarity.astro", () => {
  const pagePath = join(process.cwd(), "src/pages/solidarity.astro");
  const pageContent = readFileSync(pagePath, "utf-8");

  it("imports required components", () => {
    expect(pageContent).toContain(
      'import Layout from "../components/Layout.astro";'
    );
    expect(pageContent).toContain(
      'import SolidarityCard from "../components/SolidarityCard.astro";'
    );
    expect(pageContent).toContain(
      'import BookmarkNav from "../components/BookmarkNav.astro";'
    );
  });

  it("defines sections data structure", () => {
    expect(pageContent).toContain("const sections = [");
    expect(pageContent).toContain('id: "south-africa-and-the-continent"');
    expect(pageContent).toContain('label: "South Africa and the Continent"');
    expect(pageContent).toContain(
      'id: "global-south-solidarity-and-anti-imperialism"'
    );
    expect(pageContent).toContain(
      'label: "Global South Solidarity and Anti-Imperialism"'
    );
    expect(pageContent).toContain(
      'id: "peasant-movements-and-food-sovereignty"'
    );
    expect(pageContent).toContain(
      'label: "Peasant Movements and Food Sovereignty"'
    );
    expect(pageContent).toContain(
      'id: "working-class-struggles-and-democratic-control"'
    );
    expect(pageContent).toContain(
      'label: "Working Class Struggles and Democratic Control"'
    );
    expect(pageContent).toContain(
      'id: "community-organising-and-solidarity-economy"'
    );
    expect(pageContent).toContain(
      'label: "Community Organising and Solidarity Economy"'
    );
    expect(pageContent).toContain('id: "indigenous-resistance-and-land-back"');
    expect(pageContent).toContain(
      'label: "Indigenous Resistance and Land Back"'
    );
  });

  it("uses Layout component with proper props", () => {
    expect(pageContent).toContain(
      '<Layout\n  title="Solidarity"\n  description="Ecosocialist and allied movements fighting for climate justice, workers\' power, decolonial liberation, and solidarity across the Global South."\n  showSidebar={false}'
    );
  });

  it("has page header structure", () => {
    expect(pageContent).toContain('<h1 class="page-title">Solidarity</h1>');
    expect(pageContent).toContain('<hr class="page-rule" />');
    expect(pageContent).toContain("solidarity-intro");
  });

  it("uses BookmarkNav component with proper props", () => {
    expect(pageContent).toContain("<BookmarkNav");
    expect(pageContent).toContain("sections={sections}");
    expect(pageContent).toContain('ariaLabel="Solidarity category navigation"');
  });

  it("lists key solidarity cards (titles)", () => {
    const titles = [
      "Abahlali baseMjondolo",
      "La Via Campesina",
      "Cooperation Jackson",
      "Community Movement Builders",
      "Indigenous Environmental Network (IEN)",
    ];
    titles.forEach((title) => {
      expect(pageContent).toContain(`title="${title}"`);
    });
  });

  it("uses consistent class naming conventions", () => {
    const requiredClasses = [
      "solidarity-page",
      "solidarity-section",
      "solidarity-grid",
      "category-title",
    ];
    requiredClasses.forEach((cls) => {
      expect(pageContent).toContain(cls);
    });
    expect(pageContent).toContain("<SolidarityCard");
  });

  it("has accessible external links with aria-labels", () => {
    const ariaPattern = /ariaLabel="[^"]+website — opens in a new tab"/g;
    const matches = pageContent.match(ariaPattern) || [];
    expect(matches.length).toBeGreaterThan(5);
  });

  it("contains multiple solidarity categories", () => {
    const categoryHeadings = (
      pageContent.match(/class="category-title"/g) || []
    ).length;
    expect(categoryHeadings).toBe(6);
  });

  it("defines all category section IDs", () => {
    const ids = [
      "south-africa-and-the-continent",
      "global-south-solidarity-and-anti-imperialism",
      "peasant-movements-and-food-sovereignty",
      "working-class-struggles-and-democratic-control",
      "community-organising-and-solidarity-economy",
      "indigenous-resistance-and-land-back",
    ];
    ids.forEach((id) => {
      expect(pageContent).toContain(`id="${id}"`);
    });
  });

  it("each solidarity card has all required props", () => {
    const cardCount = (pageContent.match(/<SolidarityCard/g) || []).length;
    const solidarityCardBlocks =
      pageContent.match(/<SolidarityCard[\s\S]*?\/>/g) || [];
    const descCount = solidarityCardBlocks.filter((block) =>
      /description="[^"]+"/g.test(block)
    ).length;
    const linkCount = solidarityCardBlocks.filter((block) =>
      /url="https?:\/\/[^"]+"/g.test(block)
    ).length;
    const ariaCount = solidarityCardBlocks.filter((block) =>
      /ariaLabel="[^"]+"/g.test(block)
    ).length;

    expect(cardCount).toBeGreaterThan(10);
    expect(descCount).toBe(cardCount);
    expect(linkCount).toBe(cardCount);
    expect(ariaCount).toBe(cardCount);
  });

  it("all external links have proper URL structure", () => {
    const urls = pageContent.match(/url="https?:\/\/[^"]+"/g) || [];
    expect(urls.length).toBeGreaterThan(10);
    urls.forEach((url) => {
      expect(url).toMatch(/^url="https?:\/\/.+"/);
    });
  });

  it("every solidarity card has an aria-label", () => {
    const cards = pageContent.match(/<SolidarityCard/g) || [];
    const ariaLabels =
      pageContent.match(/ariaLabel="[^"]+website — opens in a new tab"/g) || [];
    expect(ariaLabels.length).toBe(cards.length);
  });

  it("no duplicate solidarity titles", () => {
    const titles = Array.from(pageContent.matchAll(/title="([^"]+)"/g)).map(
      (m) => m[1]
    );
    const unique = new Set(titles);
    expect(unique.size).toBe(titles.length);
  });

  it("includes smooth scrolling behavior", () => {
    expect(pageContent).toContain("html {\n    scroll-behavior: smooth;\n  }");
  });
});
