/**
 * Represents the basic metadata for a single country.
 */
export interface Country {
  name: string;
  slug: string;
  flag: string;
  description: string;
  seoDescription: string;
  category: string;
}

/**
 * Represents the humanitarian impact statistics for a country's crisis.
 */
export interface HumanitarianImpact {
  displaced: string;
  refugees: string;
  casualties: string;
  affected: string;
  livingInPoverty?: string;
  childrenOutOfSchool?: string;
  healthSystemCollapsed?: string;
  foodInsecurity?: string;
  lackOfWaterAccess?: string;
  other?: string;
}

/**
 * Represents the colonial history of a country, linking a colonial power to its legacy.
 */
export interface ColonialRoot {
  colonialPower: string;
  legacy: string;
}

/**
 * Represents the imperial history of a country, linking an imperial power to its legacy.
 */
export interface ImperialRoot {
  imperialPower: string;
  legacy: string;
}

/**
 * Represents a single event in the historical timeline of a country.
 */
export interface TimelineEvent {
  year: string;
  event?: string;
}

/**
 * Represents an organisation that individuals can support through donations.
 */
export interface Organisation {
  organisation: string;
  description: string;
  url: string;
}

/**
 * Represents a set of actions individuals can take, including donations and advocacy.
 */
export interface TakeAction {
  donate: Organisation[];
  advocacy: string[];
}

/**
 * Represents the complete data set for a single country, including its crisis details,
 * historical context, and ways to take action.
 */
export interface CountryData {
  name: string;
  emoji: string;
  ariaLabel: string;
  currentCrisisSummary: string;
  lastUpdated: string;
  humanitarianImpact: HumanitarianImpact;
  timeline: TimelineEvent[];
  colonialRoot?: ColonialRoot;
  imperialRoot?: ImperialRoot;
  historicalContext: Record<string, string>;
  takeAction: TakeAction;
  reading: Reading[];
}

/**
 * Represents a recommended reading material related to a country or crisis.
 */
export interface Reading {
  title: string;
  url: string;
  description?: string;
}
