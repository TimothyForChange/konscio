import countriesData from '../data/mapping/countries.json';
import type * as CountryTypes from '../types/country.ts';

export async function getCountryMetadata(
  countrySlug: string
): Promise<{ emoji: string; ariaLabel: string } | undefined> {
  try {
    const country = (countriesData as CountryTypes.Country[]).find(
      (c) => c.slug === countrySlug
    );

    if (!country) {
      return undefined;
    }

    const countryModule = await import(
      `../data/countries/${country.slug}.json`
    );
    const countryData = countryModule.default;

    return {
      emoji: countryData.emoji,
      ariaLabel: countryData.ariaLabel,
    };
  } catch {
    return undefined;
  }
}
