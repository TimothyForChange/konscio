import { z } from 'zod';

const ResourceLinkSchema = z.object({
  url: z.string().url('URL must be a valid URL'),
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

const MissionSchema = z.object({
  name: z.string(),
  mission: z.string(),
  description: z.string(),
  links: z.array(ResourceLinkSchema).optional(),
});

export { MissionSchema, ResourceLinkSchema };
export type MissionType = z.infer<typeof MissionSchema>;
export type ResourceLinkType = z.infer<typeof ResourceLinkSchema>;
