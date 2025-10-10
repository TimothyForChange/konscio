import countriesData from '../data/countries.json';
import termMappingsData from '../data/termMappings.json';

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
  countryName: string
): Promise<{ emoji: string; ariaLabel: string } | null> {
  try {
    const country = countriesData.find((c) => c.name === countryName);
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

export function formatTermKey(key: string): string {
  const keyMappings: Record<string, string> = termMappingsData;

  return keyMappings[key] || key.charAt(0).toUpperCase() + key.slice(1);
}
