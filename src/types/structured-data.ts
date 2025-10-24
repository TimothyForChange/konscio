import type { CountryData } from './country';

/**
 * Options for building structured data.
 */
export interface StructuredDataOptions {
  title: string;
  pageDescription: string;
  pageCanonicalUrl: string;
  pageImage?: string;
  countrySlug?: string;
  articleSchema?: ArticleSchema;
}

/**
 * Options for building an article schema.
 */
export interface ArticleSchemaOptions {
  countryData?: CountryData;
  passedTitle?: string;
  countrySlug: string;
  pageDescription: string;
  canonicalUrl: string;
  image: string;
}

/**
 * Article schema for country pages.
 */
export interface ArticleSchema {
  '@type': string;
  '@id': string;
  headline: string;
  description: string;
  image?: string;
  mainEntityOfPage: {
    '@type': string;
    '@id': string;
  };
  author: {
    '@id': string;
  };
  publisher: {
    '@id': string;
  };
  datePublished: string;
  dateModified: string;
  about: Array<{
    '@type': string;
    name?: string;
    addressCountry?: string;
  }>;
  keywords: string[];
}

/**
 * Person schema.
 */
export interface PersonSchema {
  '@type': string;
  '@id': string;
  name: string;
  alternateName: string;
  url: string;
  jobTitle: string;
  address: {
    '@type': string;
    addressLocality: string;
    addressCountry: string;
  };
  knowsAbout: string[];
  sameAs: string[];
}

/**
 * WebSite schema.
 */
export interface WebSiteSchema {
  '@type': string;
  '@id': string;
  url: string;
  name: string;
  description: string;
  publisher: {
    '@id': string;
  };
  potentialAction: {
    '@type': string;
    target: {
      '@type': string;
      urlTemplate: string;
    };
    'query-input': string;
  };
}

/**
 * BreadcrumbList schema.
 */
export interface BreadcrumbListSchema {
  '@type': string;
  '@id': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * WebPage schema.
 */
export interface WebPageSchema {
  '@type': string;
  '@id': string;
  url: string;
  name: string;
  description: string;
  inLanguage: string;
  isPartOf: {
    '@id': string;
  };
  primaryImageOfPage?: {
    '@type': string;
    url: string;
  };
  breadcrumb: {
    '@id': string;
  };
}

/**
 * Base structured data graph.
 */
export interface BaseStructuredData {
  '@context': 'https://schema.org';
  '@graph': [PersonSchema, WebSiteSchema, BreadcrumbListSchema, WebPageSchema];
}

/**
 * Complete structured data with optional article schema.
 */
export interface StructuredData {
  '@context': 'https://schema.org';
  '@graph': [
    PersonSchema,
    WebSiteSchema,
    BreadcrumbListSchema,
    WebPageSchema,
    ...ArticleSchema[],
  ];
}
