import { JSDOM } from 'jsdom';
import { describe, expect, it, vi } from 'vitest';

describe('HeaderSearch.astro', () => {
  function setupSearchDOM() {
    const html = `
      <div class='search-overlay' id='search-overlay'>
        <div class='search-container'>
          <div class='search-header'>
            <input type='text' class='search-input' id='search-input' placeholder='Search articles...' autocomplete='off' aria-label='Search articles' />
            <button class='search-close' id='search-close' aria-label='Close search'></button>
          </div>
          <div class='search-results' id='search-results'></div>
        </div>
      </div>
      <button id='search-toggle'>Search</button>
    `;

    const dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: 'http://localhost',
    });

    dom.window.fetch = vi.fn();

    return dom;
  }

  function injectSearchScript(dom: JSDOM) {
    const script = dom.window.document.createElement('script');
    script.textContent = `
      const base = '';

      let searchData = [];
      let searchOverlay, searchInput, searchResults;

      async function initSearch() {
        const response = await fetch(base + 'search.json');
        searchData = await response.json();

        searchOverlay = document.getElementById('search-overlay');
        searchInput = document.getElementById('search-input');
        searchResults = document.getElementById('search-results');

        document.getElementById('search-toggle')?.addEventListener('click', openSearch);
        document.getElementById('search-close')?.addEventListener('click', closeSearch);
        searchInput?.addEventListener('input', handleSearch);

        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && searchOverlay?.classList.contains('active')) {
            closeSearch();
          }
        });

        searchOverlay?.addEventListener('click', (e) => {
          if (e.target === searchOverlay) {
            closeSearch();
          }
        });
      }

      function openSearch() {
        searchOverlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput?.focus(), 100);
      }

      function closeSearch() {
        searchOverlay?.classList.remove('active');
        document.body.style.overflow = '';
        if (searchInput) {
          searchInput.value = '';
        }
        if (searchResults) {
          searchResults.innerHTML = '';
        }
      }

      function handleSearch(e) {
        const target = e.target;
        const query = target.value.toLowerCase().trim();

        if (query.length < 2) {
          if (searchResults) {
            searchResults.innerHTML = '';
          }
          return;
        }

        const results = searchData
          .filter(
            (post) =>
              post.title.toLowerCase().includes(query) ||
              post.excerpt.toLowerCase().includes(query) ||
              (post.categories &&
                post.categories.some((cat) =>
                  cat.toLowerCase().includes(query)
                ))
          )
          .slice(0, 10);

        displayResults(results, query);
      }

      function displayResults(results, query) {
        if (results.length === 0) {
          if (searchResults) {
            searchResults.innerHTML = \`
              <div class="search-no-results">
                <p>No articles found for "\${query}"</p>
              </div>
            \`;
          }
          return;
        }

        const resultsHTML = results
          .map(
            (post) => \`
          <article class="search-result">
            <h3 class="search-result-title">
              <a href="\${base}\${post.url.startsWith('/') ? post.url.slice(1) : post.url}">\${post.title}</a>
            </h3>
            <time class="search-result-date">\${new Date(
              post.datePublished
            ).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</time>
            \${post.excerpt ? \`<p class="search-result-excerpt">\${post.excerpt}</p>\` : ''}
            \${
              post.categories
                ? \`
              <div class="search-result-categories">
                \${post.categories.map((cat) => \`<span class="search-category">\${cat}</span>\`).join(' ')}
              </div>
            \`
                : ''
            }
          </article>
        \`
          )
          .join('');

        if (searchResults) {
          searchResults.innerHTML = \`
            <div class="search-results-header">
              <p>Found \${results.length} article\${results.length === 1 ? '' : 's'} for "\${query}"</p>
            </div>
            \${resultsHTML}
          \`;
        }
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearch);
      } else {
        initSearch();
      }
    `;
    dom.window.document.head.appendChild(script);
    return dom;
  }

  it('initializes search and fetches data', async () => {
    const dom = setupSearchDOM();
    const mockData = [
      {
        title: 'Test Post',
        url: '/blog/test',
        datePublished: '2023-01-01T00:00:00.000Z',
        excerpt: 'Test excerpt',
        categories: ['test'],
      },
    ];

    (dom.window.fetch as any).mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    injectSearchScript(dom);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(dom.window.fetch).toHaveBeenCalledWith('search.json');
  });

  it('opens search overlay on toggle click', async () => {
    const dom = setupSearchDOM();
    (dom.window.fetch as any).mockResolvedValue({
      json: () => Promise.resolve([]),
    });

    injectSearchScript(dom);
    await new Promise((resolve) => setTimeout(resolve, 0));

    const toggle = dom.window.document.getElementById('search-toggle')!;
    const overlay = dom.window.document.getElementById('search-overlay')!;

    toggle.click();

    expect(overlay.classList.contains('active')).toBe(true);
    expect(dom.window.document.body.style.overflow).toBe('hidden');
  });

  it('closes search overlay on close button click', async () => {
    const dom = setupSearchDOM();
    (dom.window.fetch as any).mockResolvedValue({
      json: () => Promise.resolve([]),
    });

    injectSearchScript(dom);
    await new Promise((resolve) => setTimeout(resolve, 0));

    const overlay = dom.window.document.getElementById('search-overlay')!;
    const closeBtn = dom.window.document.getElementById('search-close')!;
    const input = dom.window.document.getElementById(
      'search-input'
    ) as HTMLInputElement;
    const results = dom.window.document.getElementById('search-results')!;

    overlay.classList.add('active');
    input.value = 'test';
    results.innerHTML = '<div>test</div>';

    closeBtn.click();

    expect(overlay.classList.contains('active')).toBe(false);
    expect(dom.window.document.body.style.overflow).toBe('');
    expect(input.value).toBe('');
    expect(results.innerHTML).toBe('');
  });

  it('closes search on Escape key', async () => {
    const dom = setupSearchDOM();
    (dom.window.fetch as any).mockResolvedValue({
      json: () => Promise.resolve([]),
    });

    injectSearchScript(dom);
    await new Promise((resolve) => setTimeout(resolve, 0));

    const overlay = dom.window.document.getElementById('search-overlay')!;

    overlay.classList.add('active');

    dom.window.document.dispatchEvent(
      new dom.window.KeyboardEvent('keydown', { key: 'Escape' })
    );

    expect(overlay.classList.contains('active')).toBe(false);
  });

  it('closes search on overlay click', async () => {
    const dom = setupSearchDOM();
    (dom.window.fetch as any).mockResolvedValue({
      json: () => Promise.resolve([]),
    });

    injectSearchScript(dom);
    await new Promise((resolve) => setTimeout(resolve, 0));

    const overlay = dom.window.document.getElementById('search-overlay')!;

    overlay.classList.add('active');

    overlay.click();

    expect(overlay.classList.contains('active')).toBe(false);
  });

  it('filters and displays search results', async () => {
    const dom = setupSearchDOM();
    const mockData = [
      {
        title: 'Test Post 1',
        url: '/blog/test1',
        datePublished: '2023-01-01T00:00:00.000Z',
        excerpt: 'First excerpt',
        categories: ['test'],
      },
      {
        title: 'Another Post',
        url: '/blog/test2',
        datePublished: '2023-01-02T00:00:00.000Z',
        excerpt: 'Second excerpt',
        categories: ['other'],
      },
    ];

    (dom.window.fetch as any).mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    injectSearchScript(dom);
    await new Promise((resolve) => setTimeout(resolve, 0));

    const input = dom.window.document.getElementById(
      'search-input'
    ) as HTMLInputElement;
    const results = dom.window.document.getElementById('search-results')!;

    input.value = 'test';
    input.dispatchEvent(new dom.window.Event('input'));

    expect(results.innerHTML).toContain('Found 1 article for "test"');
    expect(results.innerHTML).toContain('Test Post 1');
    expect(results.innerHTML).not.toContain('Another Post');
  });

  it('shows no results message', async () => {
    const dom = setupSearchDOM();
    const mockData = [
      {
        title: 'Test Post',
        url: '/blog/test',
        datePublished: '2023-01-01T00:00:00.000Z',
        excerpt: 'Test excerpt',
        categories: ['test'],
      },
    ];

    (dom.window.fetch as any).mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    injectSearchScript(dom);
    await new Promise((resolve) => setTimeout(resolve, 0));

    const input = dom.window.document.getElementById(
      'search-input'
    ) as HTMLInputElement;
    const results = dom.window.document.getElementById('search-results')!;

    input.value = 'nonexistent';
    input.dispatchEvent(new dom.window.Event('input'));

    expect(results.innerHTML).toContain('No articles found for "nonexistent"');
  });

  it('clears results for short queries', async () => {
    const dom = setupSearchDOM();
    const mockData = [
      {
        title: 'Test Post',
        url: '/blog/test',
        datePublished: '2023-01-01T00:00:00.000Z',
        excerpt: 'Test excerpt',
        categories: ['test'],
      },
    ];

    (dom.window.fetch as any).mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    injectSearchScript(dom);
    await new Promise((resolve) => setTimeout(resolve, 0));

    const input = dom.window.document.getElementById(
      'search-input'
    ) as HTMLInputElement;
    const results = dom.window.document.getElementById('search-results')!;

    input.value = 't';
    input.dispatchEvent(new dom.window.Event('input'));

    expect(results.innerHTML).toBe('');
  });
});
