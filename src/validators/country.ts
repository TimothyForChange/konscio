import { CountriesSchema, CountrySchema } from '../schemas/country.ts';
import type { Country } from '../types/country.ts';

/**
 * Loads and validates the countries list.
 *
 * @returns Promise resolving to validated countries array
 * @throws If loading or validation fails
 */
export async function loadAndValidateCountries(): Promise<Country[]> {
  const countriesModule = await import('../data/mapping/countries.ts');
  const rawData = countriesModule.default;
  return validateCountries(rawData);
}

/**
 * Validates a single country object.
 *
 * @param countryData - Country object to validate
 * @returns Validated country object
 * @throws If validation fails
 */
export function validateCountry(countryData: unknown): Country {
  const result = CountrySchema.safeParse(countryData);

  if (!result.success) {
    throw new Error(`Country validation failed: ${result.error.message}`);
  }

  return result.data;
}

/**
 * Validates an array of country objects.
 *
 * @param countriesData - Array of country objects to validate
 * @returns Array of validated country objects
 * @throws If validation fails
 */
export function validateCountries(countriesData: unknown[]): Country[] {
  const result = CountriesSchema.safeParse(countriesData);

  if (!result.success) {
    throw new Error(
      `Countries array validation failed: ${result.error.message}`
    );
  }

  return result.data;
}
