import { TooltipsSchema } from '../schemas/tooltips.ts';
import type { Tooltips } from '../types/tooltips.ts';

/**
 * Validates the tooltips data object using the TooltipsSchema.
 *
 * @param tooltipsData - The tooltips data object to validate.
 * @returns The validated tooltips object.
 * @throws If validation fails.
 */
export function validateTooltips(tooltipsData: unknown): Tooltips {
  const result = TooltipsSchema.safeParse(tooltipsData);

  if (!result.success) {
    throw new Error(`Tooltips validation failed: ${result.error.message}`);
  }

  return result.data;
}
