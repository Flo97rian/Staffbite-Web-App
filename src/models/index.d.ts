import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





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
  constructor(init: ModelInit<Mitarbeiter>);
  static copyOf(source: Mitarbeiter, mutator: (draft: MutableModel<Mitarbeiter>) => MutableModel<Mitarbeiter> | void): Mitarbeiter;
}

export declare class Schichtplan {
  readonly id: string;
  constructor(init: ModelInit<Schichtplan>);
  static copyOf(source: Schichtplan, mutator: (draft: MutableModel<Schichtplan>) => MutableModel<Schichtplan> | void): Schichtplan;
}