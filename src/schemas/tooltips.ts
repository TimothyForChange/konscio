import { z } from 'zod';

/**
 * Zod schema for tooltip definitions.
 * Validates that tooltips is an object with string keys and string values.
 */
export const TooltipsSchema = z.record(z.string(), z.string());
