import { createHighlighter } from 'shiki';

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

export async function getCachedHighlighter() {
  if (!highlighter) {
    try {
      highlighter = await createHighlighter({
        themes: ['github-dark'],
        langs: [
          'javascript',
          'typescript',
          'astro',
          'css',
          'json',
          'bash',
          'html',
          'markdown',
        ],
      });
    } catch (error) {
      throw new Error(`Failed to create Shiki highlighter: ${error}`);
    }
  }
  return highlighter;
}
