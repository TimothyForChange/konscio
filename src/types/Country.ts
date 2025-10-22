/**
 * Basic metadata for a single country.
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
 * Humanitarian impact statistics for a country's crisis.
 */
export type HumanitarianImpact = {
  title: string;
  description: string;
}[];

/**
 * Colonial history of a country.
 */
export interface ColonialRoot {
  colonialPower: string;
  legacy: string;
}

/**
 * Imperial history of a country.
 */
export interface ImperialRoot {
  imperialPower: string;
  legacy: string;
}

/**
 * A single event in a country's historical timeline.
 */
export interface TimelineEvent {
  year: string;
  event?: string;
}

/**
 * An organisation that individuals can support.
 */
export interface Organisation {
  organisation: string;
  description: string;
  url: string;
}

/**
 * Actions individuals can take to help.
 */
export interface TakeAction {
  donate: Organisation[];
  advocacy: string[];
}

/**
 * The complete data set for a single country.
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
  historicalContext: {
    title: string;
    description: string;
  }[];
  takeAction: TakeAction;
  reading: Reading[];
}

/**
 * A recommended reading material.
 */
export interface Reading {
  title: string;
  url: string;
  description?: string;
}
