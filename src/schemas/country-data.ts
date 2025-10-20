import { z } from 'zod';

/**
 * Zod schema for humanitarian impact statistics.
 * Defines rules for data on displaced people, refugees, casualties, and other indicators.
 */
const HumanitarianImpactSchema = z.object({
  displaced: z.string(),
  refugees: z.string(),
  casualties: z.string(),
  affected: z.string(),
  livingInPoverty: z.string().optional(),
  childrenOutOfSchool: z.string().optional(),
  healthSystemCollapsed: z.string().optional(),
  foodInsecurity: z.string().optional(),
  lackOfWaterAccess: z.string().optional(),
  sexualViolence: z.string().optional(),
  livelihoodsAndEconomicLoss: z.string().optional(),
  lackOfRightsAndLivelihoods: z.string().optional(),
});

/**
 * Zod schema for the colonial roots of a crisis.
 * Captures the colonial power and its legacy.
 */
const ColonialRootSchema = z.object({
  colonialPower: z.string(),
  legacy: z.string(),
});

/**
 * Zod schema for the imperial roots of a crisis.
 * Captures the imperial power and its legacy.
 */
const ImperialRootSchema = z.object({
  imperialPower: z.string(),
  legacy: z.string(),
});

/**
 * Zod schema for a single event in a country's historical timeline.
 */
const TimelineEventSchema = z.object({
  year: z.string(),
  event: z.string().optional(),
});

/**
 * Zod schema for an organisation involved in aid or advocacy.
 */
const OrganisationSchema = z.object({
  organisation: z.string(),
  description: z.string(),
  url: z.string().url('Organisation URL must be a valid URL'),
});

/**
 * Zod schema for actions that individuals can take in response to a crisis.
 */
const TakeActionSchema = z.object({
  donate: z.array(OrganisationSchema),
  advocacy: z.array(z.string()),
});

/**
 * Zod schema for a recommended reading resource.
 */
const ReadingSchema = z.object({
  title: z.string(),
  url: z.string().url('Reading URL must be a valid URL'),
  description: z.string().optional(),
});

/**
 * Zod schema for the comprehensive data set of a single country.
 * This schema aggregates all other data structures for a country.
 */
const CountryDataSchema = z.object({
  $schema: z.string().optional(),
  name: z.string(),
  emoji: z.string(),
  ariaLabel: z.string(),
  currentCrisisSummary: z.string(),
  lastUpdated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  humanitarianImpact: HumanitarianImpactSchema,
  timeline: z.array(TimelineEventSchema),
  colonialRoot: ColonialRootSchema.optional(),
  imperialRoot: ImperialRootSchema.optional(),
  historicalContext: z.record(z.string()),
  internationalLawAndAccountability: z.string().optional(),
  takeAction: TakeActionSchema,
  reading: z.array(ReadingSchema),
});

export {
  HumanitarianImpactSchema,
  ColonialRootSchema,
  ImperialRootSchema,
  TimelineEventSchema,
  OrganisationSchema,
  TakeActionSchema,
  ReadingSchema,
  CountryDataSchema,
};

/**
 * TypeScript type for the comprehensive data of a single country.
 */
export type CountryDataType = z.infer<typeof CountryDataSchema>;

/**
 * TypeScript type for the humanitarian impact data of a country.
 */
export type HumanitarianImpactType = z.infer<typeof HumanitarianImpactSchema>;

/**
 * TypeScript type for the colonial root data of a country's crisis.
 */
export type ColonialRootType = z.infer<typeof ColonialRootSchema>;

/**
 * TypeScript type for the imperial root data of a country's crisis.
 */
export type ImperialRootType = z.infer<typeof ImperialRootSchema>;

/**
 * TypeScript type for a single event in a country's timeline.
 */
export type TimelineEventType = z.infer<typeof TimelineEventSchema>;

/**
 * TypeScript type for an organisation for donations or advocacy.
 */
export type OrganisationType = z.infer<typeof OrganisationSchema>;

/**
 * TypeScript type for actions individuals can take.
 */
export type TakeActionType = z.infer<typeof TakeActionSchema>;

/**
 * TypeScript type for a recommended reading resource.
 */
export type ReadingType = z.infer<typeof ReadingSchema>;
