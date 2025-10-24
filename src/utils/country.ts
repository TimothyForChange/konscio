import { loadCountries, loadCountryData } from './async-data-loaders';

/**
 * Gets the ISO 3166-1 alpha-2 country code for a country slug.
 *
 * @param slug - The URL-friendly slug of the country.
 * @returns The two-letter country code, or undefined for regions without a single code.
 */
export function getCountryCode(slug: string): string | undefined {
  const codeMap: Record<string, string> = {
    afghanistan: 'AF',
    cameroon: 'CM',
    car: 'CF',
    cuba: 'CU',
    drc: 'CD',
    ethiopia: 'ET',
    haiti: 'HT',
    mozambique: 'MZ',
    myanmar: 'MM',
    palestine: 'PS',
    somalia: 'SO',
    'south-sudan': 'SS',
    sudan: 'SD',
    syria: 'SY',
    ukraine: 'UA',
    venezuela: 'VE',
    yemen: 'YE',
  };
  return codeMap[slug];
}

/**
 * Retrieves the emoji and ARIA label for a country by its slug.
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
