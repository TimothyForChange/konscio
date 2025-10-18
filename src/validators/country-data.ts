import { CountryDataSchema } from '../schemas/country-data';
import type { CountryData } from '../types/country';

export function validateCountryData(countryData: unknown): CountryData {
  const result = CountryDataSchema.safeParse(countryData);

  if (!result.success) {
    throw new Error(`Country data validation failed: ${result.error.message}`);
  }

  return result.data;
}
