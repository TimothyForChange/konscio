import { SITE_URL } from '../constants/site';
import countriesList from '../data/mapping/countries';
import missionData from '../data/mission/mission.json';
import type { CountryData } from '../types/country';
import { validateMission } from '../validators/mission';
import { getCountryCode } from './country';

/**
 * Options for building structured data.
 */
export interface StructuredDataOptions {
  title: string;
  pageDescription: string;
  pageCanonicalUrl: string;
  pageImage?: string;
  countrySlug?: string;
  articleSchema?: Record<string, unknown>;
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
 * Builds an Article schema for country pages.
 *
 * @param options - The options for building the article schema
 * @returns The Article schema object
 */
export function buildArticleSchema(options: ArticleSchemaOptions) {
  const {
    countryData,
    passedTitle,
    countrySlug,
    pageDescription,
    canonicalUrl,
    image,
  } = options;

  const countryMapping = Array.isArray(countriesList)
    ? countriesList.find((c) => c.slug === countrySlug)
    : undefined;

  return {
    '@type': 'Article',
    '@id': `${SITE_URL}/countries/${countrySlug}/#article`,
    headline:
      passedTitle && typeof passedTitle === 'string'
        ? passedTitle
        : `${countryData?.name} Crisis - Timothy for Change`,
    description: pageDescription,
    image: image ? image : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    author: {
      '@id': `${SITE_URL}/#person`,
    },
    publisher: {
      '@id': `${SITE_URL}/#person`,
    },
    datePublished:
      countryData?.lastUpdated || new Date().toISOString().split('T')[0],
    dateModified:
      countryData?.lastUpdated || new Date().toISOString().split('T')[0],
    about: [
      {
        '@type': 'Place',
        name: countryData?.name,
        addressCountry: getCountryCode(countrySlug),
      },
      {
        '@type': 'Thing',
        name: 'Structural Violence',
      },
    ],
    keywords: [
      countryData?.name,
      'structural violence',
      'human rights',
      countryMapping?.category?.toLowerCase(),
    ].filter(Boolean),
  };
}

/**
 * Builds the base structured data object for the site.
 *
 * @param options - The options for building the base structured data
 * @returns The base structured data object with Person, WebSite, BreadcrumbList, and WebPage schemas
 */
export function buildBaseStructuredData(options: StructuredDataOptions) {
  const { title, pageDescription, pageCanonicalUrl, pageImage, countrySlug } =
    options;

  const mission = validateMission(missionData);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Timothy Brits',
        alternateName: 'Timothy',
        url: SITE_URL,
        jobTitle: 'Analyst of Structural Violence',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Pretoria',
          addressCountry: 'ZA',
        },
        knowsAbout: ['Structural Violence Analysis', 'Global Crises'],
        sameAs: [
          'https://github.com/TimothyForChange',
          'https://instagram.com/timothyforchange/',
          'https://threads.com/@timothyforchange',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Timothy for Change',
        description: `${mission.mission}`,
        publisher: {
          '@id': `${SITE_URL}/#person`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          ...(countrySlug
            ? [
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: Array.isArray(countriesList)
                    ? countriesList.find((c) => c.slug === countrySlug)?.name ||
                      countrySlug
                    : countrySlug,
                  item: `${SITE_URL}/countries/${countrySlug}`,
                },
              ]
            : []),
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${pageCanonicalUrl}#webpage`,
        url: pageCanonicalUrl,
        name: title,
        description: pageDescription,
        inLanguage: 'en-GB',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        primaryImageOfPage: pageImage
          ? {
              '@type': 'ImageObject',
              url: pageImage,
            }
          : undefined,
        breadcrumb: {
          '@id': `${SITE_URL}/#breadcrumb`,
        },
      },
    ],
  };
}

/**
 * Builds the complete structured data object including article schema if provided.
 *
 * @param options - The options for building the structured data
 * @returns The complete structured data object
 */
export function buildStructuredData(options: StructuredDataOptions) {
  const baseLdObject = buildBaseStructuredData(options);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...baseLdObject['@graph'],
      ...(options.articleSchema ? [options.articleSchema] : []),
    ],
  };
}
