import type { Country, CountryData } from '../types/country';
import { validateCountryData } from '../validators/country-data.ts';
import { validateCountries } from '../validators/country.ts';

export async function loadCountries(): Promise<Country[]> {
  try {
    const countriesModule = await import('../data/mapping/countries.ts');
    const rawData = countriesModule.default;
    return validateCountries(rawData);
  } catch (error) {
    throw error;
  }
}

export async function loadCountryData(
  countrySlug: string
): Promise<CountryData> {
  try {
    const countryModule = await import(`../data/countries/${countrySlug}.json`);
    const rawData = countryModule.default;
    return validateCountryData(rawData);
  } catch (error) {
    throw error;
  }
}
