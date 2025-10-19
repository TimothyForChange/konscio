import { z } from 'zod';

/**
 * Zod schema for a key-to-title map.
 * This validates an object where keys are strings and values are their corresponding
 * human-readable string titles.
 */
const KeyToTitleMapSchema = z.record(z.string(), z.string());

/**
 * Zod schema for the container of the key-to-title map.
 * This is used to validate the top-level structure of the mapping data.
 */
const KeyTitleMappingSchema = z.object({
  keyToTitleMap: KeyToTitleMapSchema,
});

export { KeyToTitleMapSchema, KeyTitleMappingSchema };
