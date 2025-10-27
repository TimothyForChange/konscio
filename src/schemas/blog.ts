import { z } from 'zod';

export const blogSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  datePublished: z.coerce.date(),
  dateModified: z.coerce.date().optional(),
  excerpt: z.string().optional(),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  author: z.string().default('Anonymous'),
  image: z.string().optional(),
});
