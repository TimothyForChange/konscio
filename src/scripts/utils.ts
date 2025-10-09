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
  Syria: { emoji: '🇸🇾', ariaLabel: 'Syrian flag' },
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
    inheritedSectarianism: 'Inherited Sectarianism',
    stateCollapse: 'State Collapse',
  };

  return keyMappings[key] || key.charAt(0).toUpperCase() + key.slice(1);
}
