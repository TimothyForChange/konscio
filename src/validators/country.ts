import { CountriesSchema, CountrySchema } from '../schemas/country.ts';
import type { Country } from '../types/country.ts';

/**
 * Asynchronously loads and validates the main list of countries.
 * This function imports the country mapping data, validates it against the `CountriesSchema`,
 * and returns a typed array of `Country` objects.
 *
 * @returns A promise that resolves to the array of validated countries.
 * @throws If loading or validation fails.
 */
export async function loadAndValidateCountries(): Promise<Country[]> {
  const countriesModule = await import('../data/mapping/countries.ts');
  const rawData = countriesModule.default;
  return validateCountries(rawData);
}

/**
 * Validates a single country data object.
 * It uses the `CountrySchema` to ensure the object has the correct structure and types.
 *
 * @param countryData - The country object to validate.
 * @returns The validated country object.
 * @throws If validation fails.
 */
export function validateCountry(countryData: unknown): Country {
  const result = CountrySchema.safeParse(countryData);

  if (!result.success) {
    throw new Error(`Country validation failed: ${result.error.message}`);
  }

  return result.data;
}

/**
 * Validates an array of country data objects.
 * It uses the `CountriesSchema` to ensure the array and its contents are correctly structured.
 *
 * @param countriesData - The array of country objects to validate.
 * @returns The array of validated country objects.
 * @throws If validation fails.
 */
export function validateCountries(countriesData: unknown[]): Country[] {
  const result = CountriesSchema.safeParse(countriesData);

  if (!result.success) {
    throw new Error(`Countries array validation failed: ${result.error.message}`);
  }

  return result.data;
}
