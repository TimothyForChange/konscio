import { CountriesSchema, CountrySchema } from '../schemas/country.ts';
import type { Country } from '../types/country.ts';

export async function loadAndValidateCountries(): Promise<Country[]> {
  const countriesModule = await import('../data/mapping/countries.ts');
  const rawData = countriesModule.default;
  return validateCountries(rawData);
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
    throw new Error(`Countries array validation failed: ${result.error.message}`);
  }

  return result.data;
}
