// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Mitarbeiter, Schichtplan } = initSchema(schema);

export {
  Mitarbeiter,
  Schichtplan
};