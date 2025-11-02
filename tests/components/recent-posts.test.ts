import { describe, expect, it } from "vitest";

describe("RecentPosts.astro", () => {
  function getRecentPosts(posts: any[]) {
    const allPosts = posts.filter((post: any) => !post.frontmatter.draft);
    const recentPosts = allPosts
      .sort(
        (a: any, b: any) =>
          new Date(b.frontmatter.datePublished).getTime() -
          new Date(a.frontmatter.datePublished).getTime()
      )
      .slice(0, 5);
    return recentPosts;
  }

  it("returns recent posts sorted by date descending", () => {
    const mockPosts = [
      {
        frontmatter: {
          title: "Old Post",
          datePublished: "2023-01-01",
          draft: false,
        },
        file: "old-post.md",
      },
      {
        frontmatter: {
          title: "New Post",
          datePublished: "2023-01-03",
          draft: false,
        },
        file: "new-post.md",
      },
      {
        frontmatter: {
          title: "Middle Post",
          datePublished: "2023-01-02",
          draft: false,
        },
        file: "middle-post.md",
      },
    ];

    const recentPosts = getRecentPosts(mockPosts);
    expect(recentPosts).toHaveLength(3);
    expect(recentPosts[0].frontmatter.title).toBe("New Post");
    expect(recentPosts[1].frontmatter.title).toBe("Middle Post");
    expect(recentPosts[2].frontmatter.title).toBe("Old Post");
  });

  it("filters out draft posts", () => {
    const mockPosts = [
      {
        frontmatter: {
          title: "Published Post",
          datePublished: "2023-01-01",
          draft: false,
        },
        file: "published.md",
      },
      {
        frontmatter: {
          title: "Draft Post",
          datePublished: "2023-01-02",
          draft: true,
        },
        file: "draft.md",
      },
    ];

    const recentPosts = getRecentPosts(mockPosts);
    expect(recentPosts).toHaveLength(1);
    expect(recentPosts[0].frontmatter.title).toBe("Published Post");
  });

  it("limits to 5 posts", () => {
    const mockPosts = Array.from({ length: 7 }, (_, i) => ({
      frontmatter: {
        title: `Post ${i + 1}`,
        datePublished: `2023-01-${String(i + 1).padStart(2, "0")}`,
        draft: false,
      },
      file: `post-${i + 1}.md`,
    }));

    const recentPosts = getRecentPosts(mockPosts);
    expect(recentPosts).toHaveLength(5);
    expect(recentPosts[0].frontmatter.title).toBe("Post 7");
    expect(recentPosts[4].frontmatter.title).toBe("Post 3");
  });

  it("returns empty array when no posts", () => {
    const recentPosts = getRecentPosts([]);
    expect(recentPosts).toEqual([]);
  });

  it("returns empty array when all posts are drafts", () => {
    const mockPosts = [
      {
        frontmatter: {
          title: "Draft 1",
          datePublished: "2023-01-01",
          draft: true,
        },
        file: "draft1.md",
      },
      {
        frontmatter: {
          title: "Draft 2",
          datePublished: "2023-01-02",
          draft: true,
        },
        file: "draft2.md",
      },
    ];

    const recentPosts = getRecentPosts(mockPosts);
    expect(recentPosts).toEqual([]);
  });

  it("handles posts with same date", () => {
    const mockPosts = [
      {
        frontmatter: {
          title: "Post A",
          datePublished: "2023-01-01",
          draft: false,
        },
        file: "post-a.md",
      },
      {
        frontmatter: {
          title: "Post B",
          datePublished: "2023-01-01",
          draft: false,
        },
        file: "post-b.md",
      },
    ];

    const recentPosts = getRecentPosts(mockPosts);
    expect(recentPosts).toHaveLength(2);
  });

  it("handles posts with invalid date formats", () => {
    const mockPosts = [
      {
        frontmatter: {
          title: "Invalid Date Post",
          datePublished: "not-a-date",
          draft: false,
        },
        file: "invalid-date.md",
      },
      {
        frontmatter: {
          title: "Valid Post",
          datePublished: "2023-01-02",
          draft: false,
        },
        file: "valid.md",
      },
    ];

    const recentPosts = getRecentPosts(mockPosts);
    expect(recentPosts).toHaveLength(2);
  });

  it("handles posts without datePublished field", () => {
    const mockPosts = [
      {
        frontmatter: {
          title: "No Date Post",
          draft: false,
        },
        file: "no-date.md",
      },
      {
        frontmatter: {
          title: "Valid Post",
          datePublished: "2023-01-02",
          draft: false,
        },
        file: "valid.md",
      },
    ];

    const recentPosts = getRecentPosts(mockPosts);
    expect(recentPosts).toHaveLength(2);
  });

  it("handles posts with null or undefined properties", () => {
    const mockPosts = [
      {
        frontmatter: {
          title: null as any,
          datePublished: null as any,
          draft: false,
        },
        file: "null-props.md",
      },
      {
        frontmatter: {
          title: undefined as any,
          datePublished: undefined as any,
          draft: false,
        },
        file: "undefined-props.md",
      },
    ];

    const recentPosts = getRecentPosts(mockPosts);
    expect(recentPosts).toHaveLength(2);
  });
});
