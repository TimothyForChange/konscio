import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');

  const searchData = posts
    .map((post) => ({
      title: post.data.title || 'Untitled',
      url: '/blog/' + post.slug,
      date: post.data.date.toISOString(),
      excerpt: post.data.excerpt || post.data.description || '',
      categories: post.data.categories || [],
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return new Response(JSON.stringify(searchData), {
    headers: { 'Content-Type': 'application/json' },
  });
}
