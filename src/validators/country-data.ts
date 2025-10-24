import { CountryDataSchema } from '../schemas/country-data';
import type { CountryData } from '../types/country';

/**
 * Validates country data using the CountryDataSchema.
 *
 * @param countryData - Country data object to validate
 * @returns Validated country data
 * @throws If validation fails
 */
export function validateCountryData(countryData: unknown): CountryData {
  const result = CountryDataSchema.safeParse(countryData);

  if (!result.success) {
    throw new Error(`Country data validation failed: ${result.error.message}`);
  }

  return result.data;
}
