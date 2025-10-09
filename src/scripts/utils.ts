export function formatText(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

export const countryMetadata: Record<
  string,
  { emoji: string; ariaLabel: string }
> = {
  Palestine: { emoji: '🇵🇸', ariaLabel: 'Palestinian flag' },
  Sudan: { emoji: '🇸🇩', ariaLabel: 'Sudanese flag' },
  Myanmar: { emoji: '🇲🇲', ariaLabel: 'Myanmar flag' },
  Ukraine: { emoji: '🇺🇦', ariaLabel: 'Ukrainian flag' },
  'Democratic Republic of the Congo': {
    emoji: '🇨🇩',
    ariaLabel: 'Democratic Republic of Congo flag',
  },
  Haiti: { emoji: '🇭🇹', ariaLabel: 'Haitian flag' },
  Ethiopia: { emoji: '🇪🇹', ariaLabel: 'Ethiopian flag' },
};

export function formatTermKey(key: string): string {
  const keyMappings: Record<string, string> = {
    internationalDynamics: 'International Dynamics',
    historicalLegacies: 'Historical Legacies',
    contemporaryContext: 'Contemporary Context',
    historicalPatterns: 'Historical Patterns',
    centralisation: 'Centralisation',
    historicalDivisions: 'Historical Divisions',
    externalInfluences: 'External Influences',
    structuralChallenges: 'Structural Challenges',
    geopoliticalDimensions: 'Geopolitical Dimensions',
    regionalInequalities: 'Regional Inequalities',
    historicalExtraction: 'Historical Extraction',
    externalInterventions: 'External Interventions',
    ethnicFederalism: 'Ethnic Federalism vs. Centralisation',
    regionalRivalries: 'Regional Rivalries',
  };

  return keyMappings[key] || key.charAt(0).toUpperCase() + key.slice(1);
}
