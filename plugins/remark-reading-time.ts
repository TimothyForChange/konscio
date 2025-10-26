import { toString } from 'mdast-util-to-string';
import getReadingTime from 'reading-time';

interface RemarkReadingTimeOptions {
  wordsPerMinute?: number;
}

export function remarkReadingTime(
  options: RemarkReadingTimeOptions = {}
): (tree: any, file: { data: any }) => void {
  const { wordsPerMinute = 200 } = options;
  return function (tree, { data }) {
    try {
      const textOnPage = toString(tree);
      if (!textOnPage.trim()) {
        data.astro.frontmatter.minutesRead = '1 min read';
        return;
      }
      const readingTime = getReadingTime(textOnPage, { wordsPerMinute });
      data.astro.frontmatter.minutesRead = readingTime.text;
    } catch (error) {
      data.astro.frontmatter.minutesRead = 'Unknown';
    }
  };
}
