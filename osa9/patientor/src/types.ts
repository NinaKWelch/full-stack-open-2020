export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export enum HealthCheckRating {
  "Healthy" = 1,
  "LowRisk" = 2,
  "HighRisk" = 3,
  "CriticalRisk" = 4,
}

export enum Gender {
  Other = "other",
  Male = "male",
  Female = "female",
}

// entry types
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist?: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// patient
export interface Patient {
  id: string;
  name: string;
  dateOfBirth?: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries?: Array<Entry>;
}

// patient form
export type PatientFormValues = Omit<Patient, "id">;

// entry form
export enum Type {
  Hospital = "Hospital",
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck",
}

export interface EntryFormValues extends Omit<BaseEntry, "id"> {
  type: Type;
  discharge?: Discharge;
  employerName?: string;
  healthCheckRating?: HealthCheckRating;
  sickLeave?: SickLeave;
}

/*interface EntryFormValues {
    date: string;
    type: Type;
    specialist: string;
    employerName: string;
    diagnosisCodes?: Array<Diagnosis["code"]>;
    description: string;
    discharge?: Discharge;
    sickLeave?: SickLeave;
    healthCheckRating?: HealthCheckRating;
}

 interface PatientFormValues {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type PatientId = string;
*/
