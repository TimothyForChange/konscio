import { z } from 'zod';

/**
 * Zod schema for humanitarian impact statistics.
 * Defines rules for data on displaced people, refugees, casualties, and other indicators.
 */
const HumanitarianImpactSchema = z.array(
  z.object({
    title: z.string(),
    description: z.string(),
  })
);

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
  year: z
    .string()
    .min(4, 'Year must be at least 4 characters')
    .max(20, 'Year must be at most 20 characters'),
  event: z.string(),
});

/**
 * Zod schema for an organisation involved in aid or advocacy.
 */
const OrganisationSchema = z.object({
  organisation: z.string(),
  description: z.string(),
  url: z.string().url('Organisation URL must be a valid URL'),
  buttonText: z.string(),
});

/**
 * Zod schema for actions that individuals can take in response to a crisis.
 */
const TakeActionSchema = z.object({
  donate: z.array(OrganisationSchema),
  advocacy: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
});

/**
 * Zod schema for a recommended reading resource.
 */
const ReadingSchema = z.object({
  title: z.string(),
  url: z.string().url('Reading URL must be a valid URL'),
  description: z.string(),
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
  lastUpdated: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  humanitarianImpact: HumanitarianImpactSchema,
  timeline: z.array(TimelineEventSchema),
  colonialRoot: ColonialRootSchema,
  imperialRoot: ImperialRootSchema,
  historicalContext: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
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
