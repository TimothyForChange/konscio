import fs from 'fs';
import path from 'path';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { CountryDataSchema } from '../src/schemas/country-data.ts';
import { MissionSchema } from '../src/schemas/mission.ts';

function generateSchemas() {
  const schemasDir = path.join(process.cwd(), 'src', 'schemas');
  if (!fs.existsSync(schemasDir)) {
    fs.mkdirSync(schemasDir, { recursive: true });
  }

  console.log('Converting Zod schemas to JSON schemas...');

  const missionJsonSchema = zodToJsonSchema(MissionSchema, {
    target: 'jsonSchema7',
    strictUnions: true,
  });

  const countryDataJsonSchema = zodToJsonSchema(CountryDataSchema, {
    target: 'jsonSchema7',
    strictUnions: true,
  });

  const missionPath = path.join(schemasDir, 'json', 'mission.schema.json');
  const countryDataPath = path.join(schemasDir, 'json', 'country-data.schema.json');

  fs.writeFileSync(missionPath, JSON.stringify(missionJsonSchema, null, 2));
  console.log(`Wrote mission schema to ${missionPath}`);

  fs.writeFileSync(countryDataPath, JSON.stringify(countryDataJsonSchema, null, 2));
  console.log(`Wrote country-data schema to ${countryDataPath}`);

  console.log('JSON schemas generated successfully!');
}

try {
  generateSchemas();
} catch (error) {
  console.error('Error generating JSON schemas:', error);
  process.exit(1);
}
