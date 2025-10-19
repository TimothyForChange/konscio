import { CountryDataSchema } from '../schemas/country-data';
import type { CountryData } from '../types/country';

/**
 * Validates the structure and types of a given country data object.
 * This function uses the `CountryDataSchema` to parse and validate the input data.
 * If validation is successful, it returns the typed `CountryData` object.
 * If validation fails, it throws an error with a descriptive message.
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
