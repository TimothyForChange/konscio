import rss from '@astrojs/rss';
import { config } from '../config';

export async function GET(context) {
  const posts = import.meta.glob('../content/blog/*.{md,mdx}', { eager: true });

  const items = Object.entries(posts)
    .map(([path, post]) => {
      const slug = path
        .split('/')
        .pop()
        .replace(/\.(md|mdx)$/, '');
      return {
        title: post.frontmatter.title,
        pubDate: post.frontmatter.datePublished,
        description: post.frontmatter.excerpt || post.frontmatter.description,
        link: `/blog/${slug}/`,
      };
    })
    .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  return rss({
    title: config.title,
    description: config.description,
    site: context.site,
    items,
    customData: `<language>en-gb</language>`,
  });
}
