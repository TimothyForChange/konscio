import { CountryDataSchema } from '../schemas/country-data';
import type { CountryData } from '../types/country';

/**
 * Validates a country data object using the CountryDataSchema.
 *
 * @param countryData - The country data object to validate.
 * @returns The validated country data.
 * @throws If the country data does not match the schema.
 */
export function validateCountryData(countryData: unknown): CountryData {
  const result = CountryDataSchema.safeParse(countryData);

  if (!result.success) {
    throw new Error(`Country data validation failed: ${result.error.message}`);
  }

  return result.data;
}
