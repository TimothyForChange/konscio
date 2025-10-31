import { toString } from 'mdast-util-to-string';
import getReadingTime from 'reading-time';

interface RemarkReadingTimeOptions {
  wordsPerMinute?: number;
}

export function remarkReadingTime(
  options: RemarkReadingTimeOptions = {}
): (tree: any, file: { data: any }) => void {
  const { wordsPerMinute = 200 } = options;
  return function (tree, file) {
    try {
      if (!file?.data?.astro?.frontmatter) {
        return;
      }
      const textOnPage = toString(tree);
      if (!textOnPage.trim()) {
        file.data.astro.frontmatter.minutesRead = '1 min read';
        return;
      }
      const readingTime = getReadingTime(textOnPage, {
        wordsPerMinute: Math.max(1, wordsPerMinute),
      });
      file.data.astro.frontmatter.minutesRead = readingTime.text;
    } catch (error) {
      if (file?.data?.astro?.frontmatter) {
        file.data.astro.frontmatter.minutesRead = '1 min read';
      }
    }
  };
}
