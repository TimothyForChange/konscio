/**
 * The default category used for filtering countries.
 */
export const DEFAULT_CATEGORY = 'All';

/**
 * An array of predefined categories for classifying countries based on the nature of their crisis.
 * Using `as const` ensures that the array is read-only and its values can be used as a type.
 */
export const COUNTRY_CATEGORIES = [
  'Invasion & Occupation',
  'Insurgency & Resource Conflict',
  'State Collapse & Civil War',
  'Occupation & Dispossession',
] as const;
