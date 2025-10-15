export function formatTermKey(termKey: string): string {
  if (termKey === 'laCentrafriqueProfonde') {
    return 'La Centrafrique Profonde (Deep Central Africa)';
  }

  const spaced = termKey.replaceAll(/([A-Z])/g, ' $1');

  let formatted = spaced.charAt(0).toUpperCase() + spaced.slice(1);

  formatted = formatted.replaceAll(' And ', ' & ');
  formatted = formatted.replaceAll(' Vs ', ' vs. ');
  formatted = formatted.replaceAll(' Of ', ' of ');
  formatted = formatted.replaceAll(' As ', ' as ');

  return formatted;
}
