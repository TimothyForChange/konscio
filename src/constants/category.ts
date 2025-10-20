/**
 * The default category used for filtering countries.
 */
export const DEFAULT_CATEGORY = 'All';

/**
 * Predefined categories for classifying countries by the nature of their crisis.
 * `as const` ensures the array is read-only and its values can be used as a type.
 */
export const COUNTRY_CATEGORIES = [
  'Invasion & Occupation',
  'Insurgency & Resource Conflict',
  'State Collapse & Civil War',
  'Occupation & Dispossession',
] as const;
