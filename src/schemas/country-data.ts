import { z } from 'zod';

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

const ColonialRootSchema = z.object({
  colonialPower: z.string(),
  legacy: z.string(),
});

const ImperialRootSchema = z.object({
  imperialPower: z.string(),
  legacy: z.string(),
});

const TimelineEventSchema = z.object({
  year: z.string(),
  event: z.string().optional(),
});

const OrganisationSchema = z.object({
  organisation: z.string(),
  description: z.string(),
  url: z.string().url('Organisation URL must be a valid URL'),
});

const TakeActionSchema = z.object({
  donate: z.array(OrganisationSchema),
  advocacy: z.array(z.string()),
});

const ReadingSchema = z.object({
  title: z.string(),
  url: z.string().url('Reading URL must be a valid URL'),
  description: z.string().optional(),
});

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

export type CountryDataType = z.infer<typeof CountryDataSchema>;
export type HumanitarianImpactType = z.infer<typeof HumanitarianImpactSchema>;
export type ColonialRootType = z.infer<typeof ColonialRootSchema>;
export type ImperialRootType = z.infer<typeof ImperialRootSchema>;
export type TimelineEventType = z.infer<typeof TimelineEventSchema>;
export type OrganisationType = z.infer<typeof OrganisationSchema>;
export type TakeActionType = z.infer<typeof TakeActionSchema>;
export type ReadingType = z.infer<typeof ReadingSchema>;
