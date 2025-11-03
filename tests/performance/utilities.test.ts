import remarkParse from "remark-parse";
import { unified } from "unified";
import { describe, expect, it } from "vitest";
import { remarkReadingTime } from "../../plugins/remark-reading-time";
import { slugifyPath } from "../../src/utils/slugify";
import {
  extractHeadings,
  filterHeadingsForTOC,
} from "../../src/utils/table-of-contents";

describe("Performance Tests", () => {
  it("slugifyPath should complete within acceptable time", async () => {
    const startTime = performance.now();
    const iterations = 10000;

    for (let i = 0; i < iterations; i++) {
      slugifyPath(`path/to/file${i}.md`);
    }

    const endTime = performance.now();
    const totalTime = endTime - startTime;

    expect(totalTime).toBeLessThan(1000);
  });

  it("extractHeadings should handle large content efficiently", () => {
    const largeContent =
      "# Title\n" +
      Array(5000)
        .fill(
          "## Section Title\nThis is content for the section.\n### Subsection\nMore content here.\n"
        )
        .join("");

    const startTime = performance.now();
    const headings = extractHeadings(largeContent);
    const endTime = performance.now();

    expect(headings.length).toBeGreaterThan(0);
    expect(endTime - startTime).toBeLessThan(500);
  });

  it("filterHeadingsForTOC should handle large arrays efficiently", () => {
    const largeHeadings = Array(5000)
      .fill(null)
      .map((_, i) => ({
        depth: (i % 6) + 1,
        text: `Heading ${i}`,
        slug: `heading-${i}`,
      }));

    const startTime = performance.now();
    const filtered = filterHeadingsForTOC(largeHeadings);
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(100);

    expect(filtered.every((h) => h.depth === 2 || h.depth === 3)).toBe(true);
  });

  it("remarkReadingTime should process content efficiently", () => {
    const longContent = "word ".repeat(10000);
    const file: any = { data: { astro: { frontmatter: {} } } };

    const startTime = performance.now();
    const tree = unified().use(remarkParse).parse(longContent);
    remarkReadingTime()(tree, file);
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(300);

    expect(file.data.astro.frontmatter.minutesRead).toMatch(/\d+ min read/);
  });
});
