// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: string;
  occupation: string;
  entries?: Entry[];
}