export interface Country {
  name: string;
  slug: string;
  flag?: string;
  description?: string;
  category?: string;
}

export interface Link {
  url: string;
  icon?: string;
  title?: string;
  description?: string;
}

export interface HumanitarianImpact {
  displaced?: string;
  refugees?: string;
  casualties?: string;
  affected?: string;
  poverty?: string;
  childrenOutOfSchool?: string;
  healthSystemCollapsed?: string;
  foodInsecurity?: string;
  waterAccess?: string;
  other?: string;
}

export interface ColonialRoot {
  colonialPower?: string;
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
  name?: string;
  currentCrisisSummary?: string;
  lastUpdated?: string;
  humanitarianImpact?: HumanitarianImpact;
  timeline?: TimelineEvent[];
  colonialRoot?: ColonialRoot;
  coreTerms?: Record<string, string>;
  takeAction?: TakeAction;
}
