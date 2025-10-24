import { loadCountries, loadCountryData } from './async-data-loaders';

/**
 * Gets ISO 3166-1 alpha-2 country code for a slug.
 *
 * @param slug - Country slug
 * @returns Two-letter country code or undefined
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
 * Gets emoji and ARIA label for a country.
 *
 * @param countrySlug - Country slug
 * @returns Promise resolving to metadata object or undefined
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
