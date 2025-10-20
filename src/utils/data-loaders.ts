import type { Country, CountryData } from '../types/country';
import type { KeyTitleMapping } from '../types/key-title-mapping';
import { validateCountryData } from '../validators/country-data.ts';
import { validateCountries } from '../validators/country.ts';
import { validateKeyTitleMapping } from '../validators/key-title-mapping.ts';

/**
 * Asynchronously loads and validates the list of all countries.
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
 * Asynchronously loads and validates the data for a single country.
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

/**
 * Asynchronously loads and validates the key-to-title mapping data.
 *
 * @returns A promise that resolves to the validated key-to-title mapping object.
 * @throws If data loading or validation fails.
 */
export async function loadAndValidateKeyTitleMapping(): Promise<KeyTitleMapping> {
  try {
    const mappingModule = await import('../data/mapping/key-title-mapping.ts');
    const rawData = mappingModule.default;
    return validateKeyTitleMapping({ keyToTitleMap: rawData });
  } catch (error) {
    throw error;
  }
}
