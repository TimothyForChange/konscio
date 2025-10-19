import fs from 'fs';
import path from 'path';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { CountryDataSchema } from '../src/schemas/country-data.ts';
import { MissionSchema } from '../src/schemas/mission.ts';

export function generateSchemas(logger = console) {
  const jsonSchemasDir = path.join(process.cwd(), 'src', 'schemas', 'json');
  if (!fs.existsSync(jsonSchemasDir)) {
    fs.mkdirSync(jsonSchemasDir, { recursive: true });
  }

  logger.info('Converting Zod schemas to JSON schemas...');

  const missionJsonSchema = zodToJsonSchema(MissionSchema, {
    target: 'jsonSchema7',
    strictUnions: true,
  });

  const countryDataJsonSchema = zodToJsonSchema(CountryDataSchema, {
    target: 'jsonSchema7',
    strictUnions: true,
  });

  const missionPath = path.join(jsonSchemasDir, 'mission.schema.json');
  const countryDataPath = path.join(jsonSchemasDir, 'country-data.schema.json');

  fs.writeFileSync(missionPath, JSON.stringify(missionJsonSchema, null, 2));
  logger.info(`Wrote mission schema to ${missionPath}`);

  fs.writeFileSync(countryDataPath, JSON.stringify(countryDataJsonSchema, null, 2));
  logger.info(`Wrote country-data schema to ${countryDataPath}`);

  logger.info('JSON schemas generated successfully!');
}
