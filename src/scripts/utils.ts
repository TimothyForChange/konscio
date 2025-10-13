import countriesData from '../data/countries.json';
import termMappingsData from '../data/termMappings.json';
import type { Country } from '../types/Country';

export function getSouthAfricaEmoji(): { emoji: string; ariaLabel: string } {
  return {
    emoji: '🇿🇦',
    ariaLabel: 'South African flag',
  };
}

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
    const country = (countriesData as Country[]).find(
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
  const countryTerms = (
    termMappingsData as Record<string, Record<string, string>>
  )[countrySlug];
  if (countryTerms && countryTerms[termKey]) {
    return countryTerms[termKey];
  }
  return termKey.charAt(0).toUpperCase() + termKey.slice(1);
}
