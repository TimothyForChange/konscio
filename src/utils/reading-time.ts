export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200
): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  if (minutes < 1) {
    return 'Less than 1 min read';
  }
  if (minutes === 1) {
    return '1 min read';
  }
  return `${minutes} min read`;
}

export function extractTextFromMarkdown(content: string): string {
  return content
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~]/g, '')
    .replace(/^>\s+/gm, '')
    .replace(/\|/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
