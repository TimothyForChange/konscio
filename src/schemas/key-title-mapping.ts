import { z } from 'zod';

const KeyToTitleMapSchema = z.record(z.string(), z.string());

const KeyTitleMappingSchema = z.object({
  keyToTitleMap: KeyToTitleMapSchema,
});

export { KeyToTitleMapSchema, KeyTitleMappingSchema };
