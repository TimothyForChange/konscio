import { defineCollection } from "astro:content";
import { blogSchema } from "../schemas/blog";

const blog = defineCollection({
  type: "content",
  schema: blogSchema,
});

export const collections = { blog };
