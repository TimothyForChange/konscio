export interface TermMappings {
  [countrySlug: string]: {
    [termKey: string]: string;
  };
}

export interface TermMappingsData
  extends Record<string, Record<string, string>> {}
