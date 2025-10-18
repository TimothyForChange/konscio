import { CountriesSchema, CountrySchema } from '../schemas/country';
import type { Country } from '../types/country';

export async function loadAndValidateCountries(): Promise<Country[]> {
  const countriesModule = await import('../data/mapping/countries.json');
  const rawData = countriesModule.default;
  const result = CountriesSchema.safeParse(rawData);

  if (!result.success) {
    throw new Error(
      `Countries data validation failed: ${result.error.message}`
    );
  }

  return result.data;
}

export function validateCountry(countryData: unknown): Country {
  const result = CountrySchema.safeParse(countryData);

  if (!result.success) {
    throw new Error(`Country validation failed: ${result.error.message}`);
  }

  return result.data;
}

export function validateCountries(countriesData: unknown[]): Country[] {
  const result = CountriesSchema.safeParse(countriesData);

  if (!result.success) {
    throw new Error(
      `Countries array validation failed: ${result.error.message}`
    );
  }

  return result.data;
}
