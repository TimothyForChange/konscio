export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  if (minutes < 1) return 'Less than 1 min read';
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
}

export function extractTextFromMarkdown(content: string): string {
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---/, '');

  const withoutCode = withoutFrontmatter.replace(/```[\s\S]*?```/g, '');

  const withoutInlineCode = withoutCode.replace(/`[^`]*`/g, '');

  const plainText = withoutInlineCode
    .replace(/#{1,6}\s/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~]/g, '')
    .replace(/>\s/g, '')
    .replace(/\|/g, ' ');

  return plainText;
}
