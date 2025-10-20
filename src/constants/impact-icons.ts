/**
 * A map from humanitarian impact labels to their corresponding Remixicon class names.
 */
export const impactIconMap: Record<string, string> = {
  Displaced: 'ri-user-location-line',
  Refugees: 'ri-emotion-sad-line',
  Casualties: 'ri-skull-line',
  Affected: 'ri-group-line',
  'Living in Poverty': 'ri-coin-line',
  'Children Out of School': 'ri-book-line',
  'Health System Collapsed': 'ri-hospital-line',
  'Food Insecurity': 'ri-restaurant-line',
  'Lack of Water Access': 'ri-water-flash-line',
  'Sexual Violence': 'ri-shield-cross-line',
  'Livelihoods and Economic Loss': 'ri-money-dollar-circle-line',
};

export type ImpactIconMap = typeof impactIconMap;
