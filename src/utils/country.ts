import { loadCountries, loadCountryData } from './data-loaders';

export async function getCountryMetadata(
  countrySlug: string
): Promise<{ emoji: string; ariaLabel: string } | undefined> {
  try {
    const countries = await loadCountries();
    const country = countries.find((c) => c.slug === countrySlug);

    if (!country) {
      return undefined;
    }

    const countryData = await loadCountryData(country.slug);

    return {
      emoji: countryData.emoji,
      ariaLabel: countryData.ariaLabel,
    };
  } catch {
    return undefined;
  }
}
