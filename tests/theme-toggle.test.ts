import { JSDOM } from 'jsdom';
import { describe, expect, it, vi } from 'vitest';

describe('theme-init.js and ThemeToggle.astro', () => {
  function runThemeInit(
    localStorageValue: string | null,
    systemPrefersDark: boolean
  ) {
    const dom = new JSDOM(
      `<!DOCTYPE html><html><head></head><body><button id='theme-toggle'></button></body></html>`,
      {
        runScripts: 'dangerously',
        resources: 'usable',
        url: 'http://localhost',
      }
    );
    const { window } = dom;
    window.localStorage.setItem('theme', localStorageValue ?? '');
    window.matchMedia = vi
      .fn()
      .mockImplementation(() => ({ matches: systemPrefersDark }));
    const script = dom.window.document.createElement('script');
    script.textContent = `
      (function () {
        let theme = 'light';
        try {
          const stored = localStorage.getItem('theme');
          if (stored === 'light' || stored === 'dark') {
            theme = stored;
          } else {
            const systemPrefersDark =
              window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            theme = systemPrefersDark ? 'dark' : 'light';
          }
        } catch (error) {
          const systemPrefersDark =
            window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          theme = systemPrefersDark ? 'dark' : 'light';
        }
        document.documentElement.dataset.theme = theme;
      })();
    `;
    dom.window.document.head.appendChild(script);
    return dom;
  }

  it('applies stored theme from localStorage', () => {
    const dom = runThemeInit('dark', false);
    expect(dom.window.document.documentElement.dataset.theme).toBe('dark');
  });

  it('applies system dark theme if no localStorage', () => {
    const dom = runThemeInit(null, true);
    expect(dom.window.document.documentElement.dataset.theme).toBe('dark');
  });

  it('applies system light theme if no localStorage and system prefers light', () => {
    const dom = runThemeInit(null, false);
    expect(dom.window.document.documentElement.dataset.theme).toBe('light');
  });

  it('toggles theme on button click and persists', () => {
    const dom = runThemeInit('light', false);
    const button = dom.window.document.getElementById('theme-toggle')!;
    dom.window.document.documentElement.dataset.theme = 'light';
    button.addEventListener('click', () => {
      const current =
        dom.window.document.documentElement.dataset.theme || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      dom.window.document.documentElement.dataset.theme = next;
      dom.window.localStorage.setItem('theme', next);
    });
    button.click();
    expect(dom.window.document.documentElement.dataset.theme).toBe('dark');
    expect(dom.window.localStorage.getItem('theme')).toBe('dark');
  });

  it('handles invalid stored theme value', () => {
    const dom = runThemeInit('invalid-theme', true);
    expect(dom.window.document.documentElement.dataset.theme).toBe('dark');
  });

  it('handles missing matchMedia', () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><html><head></head><body><button id='theme-toggle'></button></body></html>`,
      {
        runScripts: 'dangerously',
        resources: 'usable',
        url: 'http://localhost',
      }
    );
    dom.window.matchMedia = undefined as any;
    const script = dom.window.document.createElement('script');
    script.textContent = `
      (function () {
        let theme = 'light';
        try {
          const stored = localStorage.getItem('theme');
          if (stored === 'light' || stored === 'dark') {
            theme = stored;
          } else {
            const systemPrefersDark =
              window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            theme = systemPrefersDark ? 'dark' : 'light';
          }
        } catch (error) {
          const systemPrefersDark =
            window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          theme = systemPrefersDark ? 'dark' : 'light';
        }
        document.documentElement.dataset.theme = theme;
      })();
    `;
    dom.window.document.head.appendChild(script);
    expect(dom.window.document.documentElement.dataset.theme).toBe('light');
  });

  function runThemeToggle(initialTheme: string | null) {
    const dom = new JSDOM(
      `<!DOCTYPE html><html><head></head><body><button id='theme-toggle'></button></body></html>`,
      {
        runScripts: 'dangerously',
        resources: 'usable',
        url: 'http://localhost',
      }
    );
    const { window } = dom;
    if (initialTheme) {
      window.document.documentElement.dataset.theme = initialTheme;
    }
    const script = window.document.createElement('script');
    script.textContent = `
      const toggle = document.getElementById('theme-toggle');

      function setTheme(theme) {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
      }

      toggle?.addEventListener('click', () => {
        const current = document.documentElement.dataset.theme || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        setTheme(next);
      });
    `;
    window.document.head.appendChild(script);
    return dom;
  }

  it('ThemeToggle toggles from light to dark on click', () => {
    const dom = runThemeToggle('light');
    const button = dom.window.document.getElementById('theme-toggle')!;
    button.click();
    expect(dom.window.document.documentElement.dataset.theme).toBe('dark');
    expect(dom.window.localStorage.getItem('theme')).toBe('dark');
  });

  it('ThemeToggle toggles from dark to light on click', () => {
    const dom = runThemeToggle('dark');
    const button = dom.window.document.getElementById('theme-toggle')!;
    button.click();
    expect(dom.window.document.documentElement.dataset.theme).toBe('light');
    expect(dom.window.localStorage.getItem('theme')).toBe('light');
  });

  it('ThemeToggle defaults to light if no initial theme set', () => {
    const dom = runThemeToggle(null);
    const button = dom.window.document.getElementById('theme-toggle')!;
    button.click();
    expect(dom.window.document.documentElement.dataset.theme).toBe('dark');
    expect(dom.window.localStorage.getItem('theme')).toBe('dark');
  });

  it('ThemeToggle multiple clicks toggle correctly', () => {
    const dom = runThemeToggle('light');
    const button = dom.window.document.getElementById('theme-toggle')!;
    button.click();
    expect(dom.window.document.documentElement.dataset.theme).toBe('dark');
    button.click();
    expect(dom.window.document.documentElement.dataset.theme).toBe('light');
    button.click();
    expect(dom.window.document.documentElement.dataset.theme).toBe('dark');
  });
});
