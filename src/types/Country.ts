/**
 * Country metadata.
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
 * Humanitarian impact statistics.
 */
export type HumanitarianImpact = {
  title: string;
  description: string;
}[];

/**
 * Colonial history.
 */
export interface ColonialRoot {
  colonialPower: string;
  legacy: string;
}

/**
 * Imperial history.
 */
export interface ImperialRoot {
  imperialPower: string;
  legacy: string;
}

/**
 * Timeline event.
 */
export interface TimelineEvent {
  year: string;
  event: string;
}

/**
 * Organisation for support.
 */
export interface Organisation {
  organisation: string;
  description: string;
  url: string;
  buttonText?: string;
}

/**
 * Actions individuals can take.
 */
export interface TakeAction {
  donate: Organisation[];
  advocacy: {
    title: string;
    description: string;
  }[];
}

/**
 * Complete country data.
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
 * Reading resource.
 */
export interface Reading {
  title: string;
  url: string;
  description: string;
}
