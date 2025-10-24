import { z } from 'zod';

/**
 * Schema for humanitarian impact statistics.
 */
const HumanitarianImpactSchema = z.array(
  z.object({
    title: z.string(),
    description: z.string(),
  })
);

/**
 * Schema for colonial roots of a crisis.
 */
const ColonialRootSchema = z.object({
  colonialPower: z.string(),
  legacy: z.string(),
});

/**
 * Schema for imperial roots of a crisis.
 */
const ImperialRootSchema = z.object({
  imperialPower: z.string(),
  legacy: z.string(),
});

/**
 * Schema for timeline events.
 */
const TimelineEventSchema = z.object({
  year: z
    .string()
    .min(4, 'Year must be at least 4 characters')
    .max(20, 'Year must be at most 20 characters'),
  event: z.string(),
});

/**
 * Schema for organisations.
 */
const OrganisationSchema = z.object({
  organisation: z.string(),
  description: z.string(),
  url: z
    .string()
    .regex(/^https:\/\/.+$/, 'Organisation URL must be a valid HTTPS URL'),
  buttonText: z.string().optional(),
});

/**
 * Schema for take action data.
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
 * Schema for reading resources.
 */
const ReadingSchema = z.object({
  title: z.string(),
  url: z
    .string()
    .regex(/^https:\/\/.+$/, 'Reading URL must be a valid HTTPS URL'),
  description: z.string(),
});

/**
 * Schema for complete country data.
 */
const CountryDataSchema = z
  .object({
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
    colonialRoot: ColonialRootSchema.optional(),
    imperialRoot: ImperialRootSchema.optional(),
    historicalContext: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
    takeAction: TakeActionSchema,
    reading: z.array(ReadingSchema),
  })
  .refine((data) => !!data.colonialRoot || !!data.imperialRoot, {
    message: 'At least one of colonialRoot or imperialRoot must be provided.',
    path: ['colonialRoot', 'imperialRoot'],
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
