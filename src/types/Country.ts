export interface Country {
  name: string;
  slug: string;
  flag?: string;
  description?: string;
  category?: string;
}

export interface HumanitarianImpact {
  displaced?: string;
  refugees?: string;
  casualties?: string;
  affected?: string;
  livingInPoverty?: string;
  childrenOutOfSchool?: string;
  healthSystemCollapsed?: string;
  foodInsecurity?: string;
  lackOfWaterAccess?: string;
  other?: string;
}

export interface ColonialRoot {
  colonialPower?: string;
  legacy?: string;
}

export interface ImperialRoot {
  imperialPower?: string;
  legacy?: string;
}

export interface TimelineEvent {
  year?: string;
  event?: string;
}

export interface Organisation {
  organisation: string;
  description: string;
  url: string;
}

export interface TakeAction {
  donate?: Organisation[];
  advocacy?: string[];
}

export interface CountryData {
  name: string;
  currentCrisisSummary: string;
  lastUpdated: string;
  humanitarianImpact?: HumanitarianImpact;
  timeline?: TimelineEvent[];
  colonialRoot?: ColonialRoot;
  imperialRoot?: ImperialRoot;
  coreTerms?: Record<string, string>;
  takeAction?: TakeAction;
  reading?: Reading[];
  environmentalImpact?: EnvironmentalImpact;
  economicOverview?: EconomicOverview;
  culturalHeritage?: CulturalHeritage;
  geography?: Geography;
  futureOutlook?: FutureOutlook;
}

export interface Reading {
  title: string;
  url: string;
  description?: string;
}

export interface EnvironmentalImpact {
  climateVulnerabilities?: string;
  resourceExploitation?: string;
  currentThreats?: string;
  stats?: Record<string, string>;
}

export interface EconomicOverview {
  keyIndustries?: string;
  povertyStats?: string;
  foreignInvestmentHistory?: string;
  recoveryChallenges?: string;
  projections?: string;
}

export interface CulturalHeritage {
  languages?: string;
  traditions?: string;
  artForms?: string;
  suppressedGroups?: string;
  imperialImpact?: string;
}

export interface Geography {
  area?: string;
  population?: string;
  borders?: string;
  terrain?: string;
  climateZones?: string;
  demographics?: Record<string, string>;
}

export interface FutureOutlook {
  ongoingEfforts?: string;
  resilienceStories?: string;
  policyRecommendations?: string;
  timelines?: string;
}
