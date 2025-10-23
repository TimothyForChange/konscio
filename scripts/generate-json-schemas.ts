import fs from 'fs';
import path from 'path';
import * as z from 'zod';
import { CountryDataSchema } from '../src/schemas/country-data.ts';
import { MissionSchema } from '../src/schemas/mission.ts';
import { TooltipsSchema } from '../src/schemas/tooltips.ts';

/**
 * Generates JSON schemas from Zod schemas and saves them to the file system.
 * This function converts Zod schemas for mission, country data, and tooltips into JSON schema format.
 *
 * @param logger An optional logger object with an `info` method for logging output. Defaults to the global console object.
 */
export function generateSchemas(logger = console) {
  const jsonSchemasDir = path.join(process.cwd(), 'src', 'schemas', 'json');
  if (!fs.existsSync(jsonSchemasDir)) {
    fs.mkdirSync(jsonSchemasDir, { recursive: true });
  }

  const missionJsonSchema = z.toJSONSchema(MissionSchema, {
    target: 'draft-7',
  });
  const countryDataJsonSchema = z.toJSONSchema(CountryDataSchema, {
    target: 'draft-7',
  });
  const tooltipsJsonSchema = z.toJSONSchema(TooltipsSchema, {
    target: 'draft-7',
  });

  const missionPath = path.join(jsonSchemasDir, 'mission.schema.json');
  const countryDataPath = path.join(jsonSchemasDir, 'country-data.schema.json');
  const tooltipsPath = path.join(jsonSchemasDir, 'tooltips.schema.json');

  fs.writeFileSync(missionPath, JSON.stringify(missionJsonSchema, null, 2));
  logger.info(`Wrote mission schema to ${missionPath}`);

  fs.writeFileSync(
    countryDataPath,
    JSON.stringify(countryDataJsonSchema, null, 2)
  );
  logger.info(`Wrote country-data schema to ${countryDataPath}`);

  fs.writeFileSync(tooltipsPath, JSON.stringify(tooltipsJsonSchema, null, 2));
  logger.info(`Wrote tooltips schema to ${tooltipsPath}`);
}

generateSchemas();
