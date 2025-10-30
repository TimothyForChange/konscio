import rss from '@astrojs/rss';
import { config } from '../config';

export async function GET(context) {
  const posts = import.meta.glob('../content/blog/*.{md,mdx}', { eager: true });

  const items = Object.entries(posts)
    .filter(([path, post]) => post && post.frontmatter)
    .map(([path, post]) => {
      const slug = path
        .split('/')
        .pop()
        .replace(/\.(md|mdx)$/, '');
      return {
        title: post.frontmatter.title || 'Untitled',
        pubDate: post.frontmatter.datePublished,
        description:
          post.frontmatter.excerpt || post.frontmatter.description || '',
        link: `/blog/${slug}/`,
      };
    })
    .filter((item) => item.title !== 'Untitled' || item.description)
    .sort((a, b) => {
      const dateA = new Date(a.pubDate);
      const dateB = new Date(b.pubDate);
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        return 0;
      }
      return dateB.getTime() - dateA.getTime();
    });

  return rss({
    title: config.title,
    description: config.description,
    site: context.site,
    items,
    customData: `<language>en-gb</language>`,
  });
}
