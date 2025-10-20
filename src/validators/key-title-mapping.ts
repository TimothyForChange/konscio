import { KeyTitleMappingSchema } from '../schemas/key-title-mapping';
import type { KeyTitleMapping } from '../types/key-title-mapping';

/**
 * Validates a key-to-title mapping object using the KeyTitleMappingSchema.
 *
 * @param mappingData - The mapping data object to validate.
 * @returns The validated mapping object.
 * @throws If validation fails.
 */
export function validateKeyTitleMapping(mappingData: unknown): KeyTitleMapping {
  const result = KeyTitleMappingSchema.safeParse(mappingData);

  if (!result.success) {
    throw new Error(`Key-title mapping validation failed: ${result.error.message}`);
  }

  return result.data;
}
