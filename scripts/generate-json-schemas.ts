import fs from 'fs';
import path from 'path';
import { zodToJsonSchema } from 'zod-to-json-schema';

async function generateSchemas() {
  const countrySchemaModule = await import('../src/schemas/country.ts');
  const missionSchemaModule = await import('../src/schemas/mission.ts');
  const countryDataSchemaModule = await import(
    '../src/schemas/country-data.ts'
  );

  const { CountriesSchema } = countrySchemaModule;
  const { MissionSchema } = missionSchemaModule;
  const { CountryDataSchema } = countryDataSchemaModule;

  const schemasDir = path.join(process.cwd(), 'src', 'schemas');
  if (!fs.existsSync(schemasDir)) {
    fs.mkdirSync(schemasDir, { recursive: true });
  }

  console.log('Converting Zod schemas to JSON schemas...');

  const countriesJsonSchema = zodToJsonSchema(CountriesSchema, {
    target: 'jsonSchema7',
    strictUnions: true,
  });

  const missionJsonSchema = zodToJsonSchema(MissionSchema, {
    target: 'jsonSchema7',
    strictUnions: true,
  });

  const countryDataJsonSchema = zodToJsonSchema(CountryDataSchema, {
    target: 'jsonSchema7',
    strictUnions: true,
  });

  const countriesPath = path.join(schemasDir, 'countries.schema.json');
  const missionPath = path.join(schemasDir, 'mission.schema.json');
  const countryDataPath = path.join(schemasDir, 'country-data.schema.json');

  fs.writeFileSync(countriesPath, JSON.stringify(countriesJsonSchema, null, 2));
  console.log(`Wrote countries schema to ${countriesPath}`);

  fs.writeFileSync(missionPath, JSON.stringify(missionJsonSchema, null, 2));
  console.log(`Wrote mission schema to ${missionPath}`);

  fs.writeFileSync(
    countryDataPath,
    JSON.stringify(countryDataJsonSchema, null, 2)
  );
  console.log(`Wrote country-data schema to ${countryDataPath}`);

  console.log('JSON schemas generated successfully!');
}

generateSchemas().catch((error) => {
  console.error('Error generating JSON schemas:', error);
  process.exit(1);
});
