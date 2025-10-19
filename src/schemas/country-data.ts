import { z } from 'zod';

/**
 * Zod schema for the humanitarian impact of a crisis in a country.
 * Defines the structure and validation rules for statistics on displaced people,
 * refugees, casualties, and other humanitarian indicators.
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
  other: z.string().optional(),
});

/**
 * Zod schema for the colonial roots of a crisis.
 * Captures the colonial power involved and the lasting legacy of its rule.
 */
const ColonialRootSchema = z.object({
  colonialPower: z.string(),
  legacy: z.string(),
});

/**
 * Zod schema for the imperial roots of a crisis.
 * Captures the imperial power involved and the lasting legacy of its influence.
 */
const ImperialRootSchema = z.object({
  imperialPower: z.string(),
  legacy: z.string(),
});

/**
 * Zod schema for a single event in a country's historical timeline.
 * Each event includes a year and an optional description.
 */
const TimelineEventSchema = z.object({
  year: z.string(),
  event: z.string().optional(),
});

/**
 * Zod schema for an organisation involved in aid or advocacy.
 * Includes the organisation's name, a description of its work, and a URL to its website.
 */
const OrganisationSchema = z.object({
  organisation: z.string(),
  description: z.string(),
  url: z.string().url('Organisation URL must be a valid URL'),
});

/**
 * Zod schema for actions that individuals can take in response to a crisis.
 * This includes lists of organisations to donate to and advocacy points to support.
 */
const TakeActionSchema = z.object({
  donate: z.array(OrganisationSchema),
  advocacy: z.array(z.string()),
});

/**
 * Zod schema for a recommended reading resource.
 * Includes the title, a URL, and an optional description.
 */
const ReadingSchema = z.object({
  title: z.string(),
  url: z.string().url('Reading URL must be a valid URL'),
  description: z.string().optional(),
});

/**
 * Zod schema for the comprehensive data set of a single country.
 * This schema aggregates all other data structures, providing a complete picture of the
 * country's crisis, historical context, and avenues for action.
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
 * TypeScript type representing the comprehensive data for a single country.
 * @see CountryDataSchema
 */
export type CountryDataType = z.infer<typeof CountryDataSchema>;

/**
 * TypeScript type representing the humanitarian impact data for a country.
 * @see HumanitarianImpactSchema
 */
export type HumanitarianImpactType = z.infer<typeof HumanitarianImpactSchema>;

/**
 * TypeScript type representing the colonial root data for a country's crisis.
 * @see ColonialRootSchema
 */
export type ColonialRootType = z.infer<typeof ColonialRootSchema>;

/**
 * TypeScript type representing the imperial root data for a country's crisis.
 * @see ImperialRootSchema
 */
export type ImperialRootType = z.infer<typeof ImperialRootSchema>;

/**
 * TypeScript type representing a single event in a country's timeline.
 * @see TimelineEventSchema
 */
export type TimelineEventType = z.infer<typeof TimelineEventSchema>;

/**
 * TypeScript type representing an organisation for donations or advocacy.
 * @see OrganisationSchema
 */
export type OrganisationType = z.infer<typeof OrganisationSchema>;

/**
 * TypeScript type representing actions individuals can take.
 * @see TakeActionSchema
 */
export type TakeActionType = z.infer<typeof TakeActionSchema>;

/**
 * TypeScript type representing a recommended reading resource.
 * @see ReadingSchema
 */
export type ReadingType = z.infer<typeof ReadingSchema>;
