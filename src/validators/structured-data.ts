import {
  ArticleSchema,
  BaseStructuredDataSchema,
  StructuredDataSchema,
} from '../schemas/structured-data';
import type {
  ArticleSchema as ArticleSchemaType,
  BaseStructuredData,
  StructuredData,
} from '../types/structured-data';

/**
 * Validates structured data using the StructuredDataSchema.
 *
 * @param structuredData - Structured data object to validate
 * @returns Validated structured data
 * @throws If validation fails
 */
export function validateStructuredData(
  structuredData: unknown
): StructuredData {
  const result = StructuredDataSchema.safeParse(structuredData);

  if (!result.success) {
    throw new Error(
      `Structured data validation failed: ${result.error.message}`
    );
  }

  return result.data;
}

/**
 * Validates base structured data using the BaseStructuredDataSchema.
 *
 * @param baseStructuredData - Base structured data object to validate
 * @returns Validated base structured data
 * @throws If validation fails
 */
export function validateBaseStructuredData(
  baseStructuredData: unknown
): BaseStructuredData {
  const result = BaseStructuredDataSchema.safeParse(baseStructuredData);

  if (!result.success) {
    throw new Error(
      `Base structured data validation failed: ${result.error.message}`
    );
  }

  return result.data;
}

/**
 * Validates article schema using the ArticleSchema.
 *
 * @param articleSchema - Article schema object to validate
 * @returns Validated article schema
 * @throws If validation fails
 */
export function validateArticleSchema(
  articleSchema: unknown
): ArticleSchemaType {
  const result = ArticleSchema.safeParse(articleSchema);

  if (!result.success) {
    throw new Error(
      `Article schema validation failed: ${result.error.message}`
    );
  }

  return result.data;
}
