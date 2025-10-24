import { z } from 'zod';

/**
 * Schema for Person structured data.
 */
const PersonSchema = z.object({
  '@type': z.string(),
  '@id': z.string(),
  name: z.string(),
  alternateName: z.string(),
  url: z.string(),
  jobTitle: z.string(),
  address: z.object({
    '@type': z.string(),
    addressLocality: z.string(),
    addressCountry: z.string(),
  }),
  knowsAbout: z.array(z.string()),
  sameAs: z.array(z.string()),
});

/**
 * Schema for WebSite structured data.
 */
const WebSiteSchema = z.object({
  '@type': z.string(),
  '@id': z.string(),
  url: z.string(),
  name: z.string(),
  description: z.string(),
  publisher: z.object({
    '@id': z.string(),
  }),
  potentialAction: z.object({
    '@type': z.string(),
    target: z.object({
      '@type': z.string(),
      urlTemplate: z.string(),
    }),
    'query-input': z.string(),
  }),
});

/**
 * Schema for BreadcrumbList structured data.
 */
const BreadcrumbListSchema = z.object({
  '@type': z.string(),
  '@id': z.string(),
  itemListElement: z.array(
    z.object({
      '@type': z.string(),
      position: z.number(),
      name: z.string(),
      item: z.string(),
    })
  ),
});

/**
 * Schema for WebPage structured data.
 */
const WebPageSchema = z.object({
  '@type': z.string(),
  '@id': z.string(),
  url: z.string(),
  name: z.string(),
  description: z.string(),
  inLanguage: z.string(),
  isPartOf: z.object({
    '@id': z.string(),
  }),
  primaryImageOfPage: z
    .object({
      '@type': z.string(),
      url: z.string(),
    })
    .optional(),
  breadcrumb: z.object({
    '@id': z.string(),
  }),
});

/**
 * Schema for Article structured data.
 */
export const ArticleSchema = z.object({
  '@type': z.string(),
  '@id': z.string(),
  headline: z.string(),
  description: z.string(),
  image: z.string().optional(),
  mainEntityOfPage: z.object({
    '@type': z.string(),
    '@id': z.string(),
  }),
  author: z.object({
    '@id': z.string(),
  }),
  publisher: z.object({
    '@id': z.string(),
  }),
  datePublished: z.string(),
  dateModified: z.string(),
  about: z.array(
    z.object({
      '@type': z.string(),
      name: z.string().optional(),
      addressCountry: z.string().optional(),
    })
  ),
  keywords: z.array(z.string()),
});

/**
 * Schema for base structured data.
 */
export const BaseStructuredDataSchema = z.object({
  '@context': z.literal('https://schema.org'),
  '@graph': z.tuple([
    PersonSchema,
    WebSiteSchema,
    BreadcrumbListSchema,
    WebPageSchema,
  ]),
});

/**
 * Schema for complete structured data.
 */
export const StructuredDataSchema = z.object({
  '@context': z.literal('https://schema.org'),
  '@graph': z
    .tuple([PersonSchema, WebSiteSchema, BreadcrumbListSchema, WebPageSchema])
    .rest(ArticleSchema),
});
