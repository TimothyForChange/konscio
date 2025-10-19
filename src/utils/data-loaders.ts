import type { Country, CountryData } from '../types/country';
import { validateCountryData } from '../validators/country-data.ts';
import { validateCountries } from '../validators/country.ts';

/**
 * Asynchronously loads and validates the list of all countries.
 * This function dynamically imports the main country mapping file and passes its
 * content to a validator.
 *
 * @returns A promise that resolves to an array of validated country objects.
 * @throws If the data loading or validation fails.
 */
export async function loadCountries(): Promise<Country[]> {
  try {
    const countriesModule = await import('../data/mapping/countries.ts');
    const rawData = countriesModule.default;
    return validateCountries(rawData);
  } catch (error) {
    throw error;
  }
}

/**
 * Asynchronously loads and validates the data for a single, specific country.
 * This function dynamically imports a country's JSON data file based on its slug
 * and passes the content to a validator.
 *
 * @param countrySlug - The slug of the country to load.
 * @returns A promise that resolves to the validated country data object.
 * @throws If the data loading or validation fails.
 */
export async function loadCountryData(countrySlug: string): Promise<CountryData> {
  try {
    const countryModule = await import(`../data/countries/${countrySlug}.json`);
    const rawData = countryModule.default;
    return validateCountryData(rawData);
  } catch (error) {
    throw error;
  }
}
