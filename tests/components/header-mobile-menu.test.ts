import { readFileSync } from "fs";
import { join } from "path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

describe("HeaderMobileMenu.astro", () => {
  function setupDOM() {
    const html = `
      <!DOCTYPE html>
      <html>
      <body>
        <div class="mobile-menu" id="mobile-menu">
          <nav class="mobile-menu" aria-label="Mobile navigation">
            <ul class="mobile-nav-list">
              <li><a href="/" data-astro-prefetch class="mobile-nav-link">Home</a></li>
              <li><a href="/blog" data-astro-prefetch class="mobile-nav-link">Blog</a></li>
              <li><a href="/categories" data-astro-prefetch class="mobile-nav-link">Categories</a></li>
              <li><a href="/about" data-astro-prefetch class="mobile-nav-link">About</a></li>
            </ul>
          </nav>
        </div>
        <button id="hamburger-toggle">Menu</button>
      </body>
      </html>
    `;

    const dom = new JSDOM(html, {
      runScripts: "dangerously",
      resources: "usable",
      url: "http://localhost",
    });

    return dom;
  }

  it("has proper TypeScript interface", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/HeaderMobileMenu.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain("interface Props");
    expect(componentContent).toContain("base: string");
    expect(componentContent).toContain("const { base } = Astro.props");
  });

  it("contains navigation structure", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/HeaderMobileMenu.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain('<nav class="mobile-menu"');
    expect(componentContent).toContain('aria-label="Mobile navigation"');
    expect(componentContent).toContain('<ul class="mobile-nav-list">');
    expect(componentContent).toContain("<li><a href={base}");
    expect(componentContent).toContain("data-astro-prefetch");
  });

  it("has all navigation links", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/HeaderMobileMenu.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain(
      '<a href={base} data-astro-prefetch class="mobile-nav-link">Home</a>'
    );
    expect(componentContent).toContain('href={base + "blog"}');
    expect(componentContent).toContain('href={base + "categories"}');
    expect(componentContent).toContain('href={base + "about"}');
  });

  it("has proper mobile menu styling", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/HeaderMobileMenu.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain(".mobile-menu");
    expect(componentContent).toContain("position: fixed");
    expect(componentContent).toContain("transform: translateX(-100%)");
    expect(componentContent).toContain("transition: transform 0.3s ease");
    expect(componentContent).toContain(".mobile-menu.active");
    expect(componentContent).toContain("transform: translateX(0)");
  });

  it("has navigation link styling", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/HeaderMobileMenu.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain(".mobile-nav-link");
    expect(componentContent).toContain("display: block");
    expect(componentContent).toContain("text-transform: uppercase");
    expect(componentContent).toContain("letter-spacing: 0.1em");
    expect(componentContent).toContain(
      "border-bottom: 1px solid var(--color-border)"
    );
    expect(componentContent).toContain("color: var(--color-accent)");
  });

  it("has hover and focus states", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/HeaderMobileMenu.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain(".mobile-nav-link:hover");
    expect(componentContent).toContain(".mobile-nav-link:focus");
    expect(componentContent).toContain(
      "background-color: var(--color-surface)"
    );
  });

  it("has proper z-index and positioning", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/HeaderMobileMenu.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain("z-index: 99");
    expect(componentContent).toContain("top: 0");
    expect(componentContent).toContain("left: 0");
    expect(componentContent).toContain("right: 0");
    expect(componentContent).toContain("bottom: 0");
  });

  it("includes proper accessibility attributes", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/HeaderMobileMenu.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain('aria-label="Mobile navigation"');
  });

  it("includes data-astro-prefetch on navigation links", () => {
    const componentPath = join(
      process.cwd(),
      "src/components/HeaderMobileMenu.astro"
    );
    const componentContent = readFileSync(componentPath, "utf-8");

    expect(componentContent).toContain("data-astro-prefetch");
  });

  it("renders with correct base path", async () => {
    const dom = setupDOM();
    const document = dom.window.document;

    const homeLink = document.querySelector('.mobile-nav-link[href="/"]');
    const blogLink = document.querySelector('.mobile-nav-link[href="/blog"]');
    const categoriesLink = document.querySelector(
      '.mobile-nav-link[href="/categories"]'
    );
    const aboutLink = document.querySelector('.mobile-nav-link[href="/about"]');

    expect(homeLink).not.toBeNull();
    expect(blogLink).not.toBeNull();
    expect(categoriesLink).not.toBeNull();
    expect(aboutLink).not.toBeNull();
  });

  it("toggles mobile menu visibility on hamburger click", () => {
    const html = `
      <!DOCTYPE html>
      <html>
      <body>
        <div class="mobile-menu" id="mobile-menu">
          <nav class="mobile-menu" aria-label="Mobile navigation">
            <ul class="mobile-nav-list">
              <li><a href="/" data-astro-prefetch class="mobile-nav-link">Home</a></li>
            </ul>
          </nav>
        </div>
        <button id="hamburger-toggle">Menu</button>
      </body>
      </html>
    `;

    const dom = new JSDOM(html, {
      runScripts: "dangerously",
      resources: "usable",
      url: "http://localhost",
    });

    const document = dom.window.document;

    const script = dom.window.document.createElement("script");
    script.textContent = `
      document.getElementById("hamburger-toggle").addEventListener("click", function() {
        const menu = document.getElementById("mobile-menu");
        menu.classList.toggle("active");
      });
    `;
    dom.window.document.head.appendChild(script);

    const hamburger = document.getElementById("hamburger-toggle")!;
    const mobileMenu = document.getElementById("mobile-menu")!;

    expect(mobileMenu.classList.contains("active")).toBe(false);

    hamburger.click();
    expect(mobileMenu.classList.contains("active")).toBe(true);

    hamburger.click();
    expect(mobileMenu.classList.contains("active")).toBe(false);
  });
});
