import { z } from 'zod';

/**
 * Zod schema for a key-to-title map.
 * Validates an object with string keys and string values.
 */
const KeyToTitleMapSchema = z.record(z.string(), z.string());

/**
 * Zod schema for the container of the key-to-title map.
 */
const KeyTitleMappingSchema = z.object({
  keyToTitleMap: KeyToTitleMapSchema,
});

export { KeyToTitleMapSchema, KeyTitleMappingSchema };
