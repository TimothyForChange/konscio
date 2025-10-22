import { z } from 'zod';

/**
 * Zod schema for a single resource link.
 */
const ResourceLinkSchema = z.object({
  url: z.string().url('URL must be a valid URL'),
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

/**
 * Zod schema for the mission statement data.
 */
const MissionSchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  mission: z.string(),
  description: z.string(),
  links: z.array(ResourceLinkSchema).optional(),
});

export { MissionSchema, ResourceLinkSchema };
