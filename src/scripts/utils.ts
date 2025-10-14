import countriesData from '../data/countries.json';
import termMappingsData from '../data/termMappings.json';
import type * as CountryTypes from '../types/Country';
import type { TermMappings } from '../types/TermMappings';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatText(text: string): string {
  const escaped = escapeHtml(text);

  let result = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  result = result.replace(/\[([^\]]+)\](?!\()/g, (match, p1, offset, str) => {
    const prevChar = offset > 0 ? str[offset - 1] : '';
    if (prevChar === '!') {
      return match;
    }
    return `<cite class="bracketed">${p1}</cite>`;
  });

  return result;
}

export async function getCountryMetadata(
  countrySlug: string
): Promise<{ emoji: string; ariaLabel: string } | null> {
  try {
    const country = (countriesData as CountryTypes.Country[]).find(
      (c) => c.slug === countrySlug
    );
    if (!country) {
      return null;
    }

    const countryData = (await import(`../data/countries/${country.slug}.json`))
      .default;

    return {
      emoji: countryData.emoji,
      ariaLabel: countryData.ariaLabel,
    };
  } catch {
    return null;
  }
}

export function formatTermKey(termKey: string, countrySlug: string): string {
  const countryTerms = (termMappingsData as TermMappings)[countrySlug];
  if (countryTerms && countryTerms[termKey]) {
    return countryTerms[termKey];
  }
  return termKey.charAt(0).toUpperCase() + termKey.slice(1);
}
