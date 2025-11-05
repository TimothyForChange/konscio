import { z } from "astro:content";

export const dispatchesSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  datePublished: z.coerce.date(),
  dateModified: z.coerce.date().optional(),
  excerpt: z.string(),
  categories: z.array(z.string()),
  tags: z.array(z.string()),
  author: z.string().default("Anonymous"),
  image: z.string().optional(),
  draft: z.boolean().default(false),
});
