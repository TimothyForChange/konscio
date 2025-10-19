import { KeyTitleMappingSchema } from '../schemas/key-title-mapping';
import type { KeyTitleMapping } from '../types/key-title-mapping';

export function validateKeyTitleMapping(mappingData: unknown): KeyTitleMapping {
  const result = KeyTitleMappingSchema.safeParse(mappingData);

  if (!result.success) {
    throw new Error(`Key-title mapping validation failed: ${result.error.message}`);
  }

  return result.data;
}
