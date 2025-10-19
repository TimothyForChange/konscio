import { KeyTitleMappingSchema } from '../schemas/key-title-mapping';
import type { KeyTitleMapping } from '../types/key-title-mapping';

/**
 * Validates the structure of a key-to-title mapping object.
 * This function uses the `KeyTitleMappingSchema` to parse and validate the input data.
 * It returns a typed `KeyTitleMapping` object on success.
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
