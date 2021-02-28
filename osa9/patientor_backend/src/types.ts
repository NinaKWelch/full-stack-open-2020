export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

interface Discharge {
    date: string;
    criteria: string;
}

interface SickLeave  {
    startDate: string;
    endDate: string;
}

export enum HealthCheckRating {
    "Healthy" = 1,
    "LowRisk" = 2,
    "HighRisk" = 3,
    "CriticalRisk" = 4
}

export enum Gender {
    Other = 'other',
    Male = 'male',
    Female = 'female',
}

// entry types
interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
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
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export interface PublicPatient extends Omit<Patient, 'ssn' | 'entries' > {
    healthRating: number | string;
}

export type NewPatient = Omit<Patient, 'id' | 'entries' >;

// new entry
export type Type = 
    "Hospital" |
    "OccupationalHealthcare" |
    "HealthCheck";

export interface NewEntry extends BaseEntry {
    type: Type;
    discharge?: Discharge;
    employerName?: string;
    healthCheckRating?: HealthCheckRating;
    sickLeave?: SickLeave;
} 






