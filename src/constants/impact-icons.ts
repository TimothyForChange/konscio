/**
 * A map from humanitarian impact labels to their corresponding Remixicon class names.
 */
export const impactIconMap: Record<string, string> = {
  Displaced: 'ri-road-map-line',
  Refugees: 'ri-emotion-sad-line',
  Casualties: 'ri-skull-line',
  Affected: 'ri-group-line',
  'Living in Poverty': 'ri-hand-coin-line',
  'Children Out of School': 'ri-book-line',
  'Health System Collapsed': 'ri-hospital-line',
  'Food Insecurity': 'ri-restaurant-line',
  'Lack of Water Access': 'ri-drop-line',
  'Sexual Violence': 'ri-alert-line',
  'Livelihoods and Economic Loss': 'ri-money-dollar-circle-line',
};

export type ImpactIconMap = typeof impactIconMap;
