import { loadCountries, loadCountryData } from './data-loaders';

/**
 * Retrieves the emoji and ARIA label for a specific country by its slug.
 * This function fetches the list of all countries, finds the matching one, and then
 * loads its detailed data to extract the required metadata.
 *
 * @param countrySlug - The URL-friendly slug of the country.
 * @returns A promise that resolves to an object with the country's emoji and ARIA label, or undefined if not found.
 */
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
