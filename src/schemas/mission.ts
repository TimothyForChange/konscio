import { z } from 'zod';

/**
 * Zod schema for a single resource link.
 * Defines the structure for an external link, including its URL, icon, title, and description.
 */
const ResourceLinkSchema = z.object({
  url: z.string().url('URL must be a valid URL'),
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

/**
 * Zod schema for the mission statement data.
 * Defines the overall structure of the mission content, including the project name,
 * mission statement, a detailed description, and an optional array of resource links.
 */
const MissionSchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  mission: z.string(),
  description: z.string(),
  links: z.array(ResourceLinkSchema).optional(),
});

export { MissionSchema, ResourceLinkSchema };

/**
 * TypeScript type representing the mission statement data.
 * @see MissionSchema
 */
export type MissionType = z.infer<typeof MissionSchema>;

/**
 * TypeScript type representing a single resource link.
 * @see ResourceLinkSchema
 */
export type ResourceLinkType = z.infer<typeof ResourceLinkSchema>;
