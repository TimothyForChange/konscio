import { z } from 'zod';

/**
 * Schema for resource links.
 */
const ResourceLinkSchema = z.object({
  url: z.string().url('URL must be a valid URL'),
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

/**
 * Schema for mission data.
 */
const MissionSchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  mission: z.string(),
  description: z.string(),
  links: z.array(ResourceLinkSchema).optional(),
});

export { MissionSchema, ResourceLinkSchema };
