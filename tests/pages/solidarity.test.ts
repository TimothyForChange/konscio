import { readFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

describe("solidarity.astro", () => {
  const pagePath = join(process.cwd(), "src/pages/solidarity.astro");
  const pageContent = readFileSync(pagePath, "utf-8");

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

  it("contains category navigation with anchors", () => {
    const anchors = [
      "#south-africa-and-the-continent",
      "#global-south-solidarity-and-anti-imperialism",
      "#peasant-movements-and-food-sovereignty",
      "#working-class-struggles-and-democratic-control",
      "#community-organising-and-solidarity-economy",
      "#indigenous-resistance-and-land-back",
    ];
    anchors.forEach((anchor) => {
      expect(pageContent).toContain(`href="${anchor}"`);
    });
  });

  it("lists key solidarity cards (titles)", () => {
    const titles = [
      "African Climate Alliance",
      "Community Movement Builders",
      "Philly Thrive",
      "La Via Campesina",
      "Cooperation Jackson",
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

  it("has navigation element with proper aria-label", () => {
    expect(pageContent).toContain(
      '<nav class="solidarity-nav" aria-label="Solidarity category navigation">'
    );
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

  describe("bookmark navigation", () => {
    it("has bookmark container with proper structure", () => {
      expect(pageContent).toContain('<div class="bookmark-container">');
      expect(pageContent).toContain(
        '<button\n            class="bookmark-toggle"'
      );
      expect(pageContent).toContain(
        '<ul class="bookmark-list" id="bookmark-list">'
      );
    });

    it("bookmark toggle has proper accessibility attributes", () => {
      expect(pageContent).toContain('aria-expanded="false"');
      expect(pageContent).toContain('aria-controls="bookmark-list"');
      expect(pageContent).toContain(
        '<span class="bookmark-text">Jump to Section</span>'
      );
      expect(pageContent).toContain(
        '<span class="bookmark-icon" aria-hidden="true">↓</span>'
      );
    });

    it("bookmark list contains all category links", () => {
      const bookmarkLinks = [
        'href="#south-africa-and-the-continent"',
        'href="#global-south-solidarity-and-anti-imperialism"',
        'href="#peasant-movements-and-food-sovereignty"',
        'href="#working-class-struggles-and-democratic-control"',
        'href="#community-organising-and-solidarity-economy"',
        'href="#indigenous-resistance-and-land-back"',
      ];

      bookmarkLinks.forEach((link) => {
        expect(pageContent).toContain(link);
      });
    });

    it("includes interactive JavaScript for bookmark functionality", () => {
      expect(pageContent).toContain("<script>");
      expect(pageContent).toContain(
        'document.addEventListener("DOMContentLoaded"'
      );
      expect(pageContent).toContain(
        'document.querySelector(".bookmark-toggle")'
      );
      expect(pageContent).toContain('document.querySelector(".bookmark-list")');
      expect(pageContent).toContain("aria-expanded");
      expect(pageContent).toContain('classList.add("show")');
      expect(pageContent).toContain('classList.remove("show")');
    });

    it("has responsive CSS for mobile and desktop", () => {
      expect(pageContent).toContain("@media (max-width: 768px)");
      expect(pageContent).toContain("@media (min-width: 769px)");
      expect(pageContent).toContain(".bookmark-toggle");
      expect(pageContent).toContain(".bookmark-list");
      expect(pageContent).toContain(".bookmark-container");
    });

    it("includes smooth scrolling behavior", () => {
      expect(pageContent).toContain(
        "html {\n    scroll-behavior: smooth;\n  }"
      );
    });
  });
});
