import countries from '../data/mapping/countries.ts';
import type { Country, CountryData } from '../types/country';
import { validateCountryData } from '../validators/country-data.ts';
import { validateCountries } from '../validators/country.ts';

/**
 * Loads and validates all countries.
 *
 * @returns Promise resolving to countries array
 */
export async function loadCountries(): Promise<Country[]> {
  return validateCountries(countries);
}

/**
 * Loads and validates data for a specific country.
 *
 * @param countrySlug - Country slug to load
 * @returns Promise resolving to country data
 */
export async function loadCountryData(
  countrySlug: string
): Promise<CountryData> {
  const countryModule = await import(`../data/countries/${countrySlug}.json`);
  const rawData = countryModule.default;
  return validateCountryData(rawData);
}
