import termMappingsData from '../data/termMappings.json';
import type { TermMappings } from '../types';

export function formatTermKey(termKey: string, countrySlug: string): string {
  const countryTerms = (termMappingsData as TermMappings)[countrySlug];
  if (countryTerms && countryTerms[termKey]) {
    return countryTerms[termKey];
  }
  return termKey.charAt(0).toUpperCase() + termKey.slice(1);
}
