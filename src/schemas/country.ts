import { z } from 'zod';
import { COUNTRY_CATEGORIES } from '../constants/category';

/**
 * Zod schema for a single country's metadata.
 * Defines the core properties of a country, including its name, URL slug, flag emoji,
 * description, and crisis category.
 */
const CountrySchema = z.object({
  name: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly'),
  flag: z.string(),
  description: z.string(),
  seoDescription: z.string(),
  category: z.enum(COUNTRY_CATEGORIES),
});

/**
 * Zod schema for an array of country metadata objects.
 * This is used to validate a list of countries.
 */
const CountriesSchema = z.array(CountrySchema);

export { CountrySchema, CountriesSchema };
