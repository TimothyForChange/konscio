export async function GET() {
  const posts = import.meta.glob('../content/blog/*.md', { eager: true });

  const searchData = [];

  for (const path in posts) {
    const post = posts[path];
    const url = path.replace('../content', '').replace('.md', '');

    searchData.push({
      title: post.frontmatter.title || 'Untitled',
      url: url,
      date: post.frontmatter.date || new Date().toISOString(),
      excerpt: post.frontmatter.excerpt || post.frontmatter.description || '',
      categories: post.frontmatter.categories || [],
    });
  }

  searchData.sort((a, b) => new Date(b.date) - new Date(a.date));

  return new Response(JSON.stringify(searchData), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
