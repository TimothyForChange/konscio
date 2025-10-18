import { CountriesSchema } from '../schemas/country';
import { CountryDataSchema } from '../schemas/country-data';
import type { Country, CountryData } from '../types/country';

export async function loadCountries(): Promise<Country[]> {
  try {
    const countriesModule = await import('../data/mapping/countries.json');
    const rawData = countriesModule.default;
    const result = CountriesSchema.safeParse(rawData);

    if (!result.success) {
      throw new Error(
        `Countries data validation failed: ${result.error.message}`
      );
    }

    return result.data;
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
    const result = CountryDataSchema.safeParse(rawData);

    if (!result.success) {
      throw new Error(
        `Country data validation failed for ${countrySlug}: ${result.error.message}`
      );
    }

    return result.data;
  } catch (error) {
    throw error;
  }
}
