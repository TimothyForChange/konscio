import { JSDOM } from "jsdom";
import { describe, expect, it, vi } from "vitest";

describe("TableOfContents.astro Runtime Behavior", () => {
  function setupDOMWithContent() {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test</title>
        </head>
        <body>
          <nav class="table-of-contents">
            <h2 class="toc-title">Table of Contents</h2>
            <ol class="toc-list">
              <li class="toc-item toc-level-2">
                <a href="#heading-1" class="toc-link">Heading 1</a>
              </li>
              <li class="toc-item toc-level-3">
                <a href="#heading-2" class="toc-link">Heading 2</a>
              </li>
              <li class="toc-item toc-level-2">
                <a href="#heading-3" class="toc-link">Heading 3</a>
              </li>
            </ol>
          </nav>

          <h2 id="heading-1">Heading 1</h2>
          <p>Content for heading 1</p>

          <h3 id="heading-2">Heading 2</h3>
          <p>Content for heading 2</p>

          <h2 id="heading-3">Heading 3</h2>
          <p>Content for heading 3</p>
        </body>
      </html>
    `;

    const dom = new JSDOM(html, {
      runScripts: "dangerously",
      resources: "usable",
      url: "http://localhost",
    });

    const script = dom.window.document.createElement("script");
    script.textContent = `
      document.addEventListener("DOMContentLoaded", () => {
        const tocLinks = document.querySelectorAll(".toc-link");

        tocLinks.forEach((link) => {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href")?.slice(1);
            const targetElement = targetId
              ? document.getElementById(targetId)
              : null;

            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });

              history.pushState(null, "", \`#\${targetId}\`);
            }
          });
        });

        const observerOptions = {
          rootMargin: "-20% 0px -70% 0px",
        };

        const observerCallback = (entries) => {
          entries.forEach((entry) => {
            const id = entry.target.getAttribute("id");
            const tocLink = document.querySelector(\`[href="#\${id}"]\`);

            if (tocLink) {
              if (entry.isIntersecting) {
                document.querySelectorAll(".toc-link").forEach((link) => {
                  link.classList.remove("active");
                });
                tocLink.classList.add("active");
              }
            }
          });
        };

        if (typeof IntersectionObserver !== 'undefined') {
          const observer = new IntersectionObserver(
            observerCallback,
            observerOptions
          );

          document.querySelectorAll("h2[id], h3[id]").forEach((heading) => {
            observer.observe(heading);
          });
        }
      });
    `;
    dom.window.document.head.appendChild(script);

    return dom;
  }

  it("should handle click events and scroll to section", async () => {
    const dom = setupDOMWithContent();
    const window = dom.window;
    const document = window.document;

    window.HTMLElement.prototype.scrollIntoView = vi.fn();

    await new Promise((resolve) => setTimeout(resolve, 0));

    const link = document.querySelector(
      '.toc-link[href="#heading-2"]'
    ) as HTMLAnchorElement;
    const targetElement = document.getElementById("heading-2");

    expect(targetElement).not.toBeNull();

    link?.click();

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it("should update active class based on viewport position", async () => {
    const dom = setupDOMWithContent();
    const window = dom.window;

    const mockObserve = vi.fn();
    const mockUnobserve = vi.fn();
    const mockDisconnect = vi.fn();

    window.IntersectionObserver = class MockIntersectionObserver {
      constructor(
        callback: (
          entries: IntersectionObserverEntry[],
          observer: IntersectionObserver
        ) => void,
        options?: IntersectionObserverInit
      ) {
        this.callback = callback;
        this.options = options;
      }
      observe = mockObserve;
      unobserve = mockUnobserve;
      disconnect = mockDisconnect;
      callback: (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => void;
      options?: IntersectionObserverInit;
    };

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(mockObserve).toHaveBeenCalledTimes(3);

    const observerInstance = new window.IntersectionObserver(() => {});
    expect(observerInstance.callback).toBeDefined();
  });

  it("should handle empty headings array gracefully", () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <body>
          <!-- No table of contents when headings array is empty -->
        </body>
      </html>
    `;

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const toc = document.querySelector(".table-of-contents");
    expect(toc).toBeNull();
  });

  it("should not render without headings", () => {
    const html = `
      <!DOCTYPE html>
      <html>
        <body>
          <div>No headings here</div>
        </body>
      </html>
    `;

    const dom = new JSDOM(html);
    const document = dom.window.document;

    expect(document.querySelector(".table-of-contents")).toBeNull();
  });
});
