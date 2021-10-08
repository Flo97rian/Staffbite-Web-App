import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type MitarbeiterMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SchichtplanMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Mitarbeiter {
  readonly id: string;
  readonly admin: string;
  readonly aktiv?: boolean;
  readonly name: string;
  readonly email: string;
  readonly stundenlohn?: number;
  readonly zielmtleuro?: number;
  readonly zielmtlh?: number;
  readonly ueberstunden?: boolean;
  readonly frei?: boolean;
  readonly erfahrung?: string;
  readonly schichtenwoche?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Mitarbeiter, MitarbeiterMetaData>);
  static copyOf(source: Mitarbeiter, mutator: (draft: MutableModel<Mitarbeiter, MitarbeiterMetaData>) => MutableModel<Mitarbeiter, MitarbeiterMetaData> | void): Mitarbeiter;
}

export declare class Schichtplan {
  readonly id: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Schichtplan, SchichtplanMetaData>);
  static copyOf(source: Schichtplan, mutator: (draft: MutableModel<Schichtplan, SchichtplanMetaData>) => MutableModel<Schichtplan, SchichtplanMetaData> | void): Schichtplan;
}