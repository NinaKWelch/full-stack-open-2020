/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NewPatient, NewEntry, Gender, Type, HealthCheckRating } from './types';

const isString = (text: unknown): text is string => (
    typeof text === 'string' || text instanceof String
);

const parseValue = (key: string, value: unknown): string => {
    if (!value || !isString(value)) {
        throw new Error(`Incorrect or missing ${key}`);
    }

    return value;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));
 
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }

    return date;
};

const isGender = (param: unknown): param is Gender => (
    param === Gender.Other ||
    param === Gender.Male  ||
    param === Gender.Female
);

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }

    return gender;
};

const isType = (param: unknown): param is Type => (
    param === 'Hospital' || 
    param === 'OccupationalHealthcare' ||
    param === 'HealthCheck'
);

const parseType = (type: unknown): Type => {
    if (!type || !isType(type)) {
        throw new Error('Incorrect or missing type');
    }

    return type;
};

const isRating = (param: unknown): param is HealthCheckRating => (
    param === HealthCheckRating.Healthy || 
    param === HealthCheckRating.LowRisk ||
    param === HealthCheckRating.HighRisk ||
    param === HealthCheckRating.CriticalRisk
);

const parseRating = (rating: unknown): HealthCheckRating => {
    if (!rating || !isRating(rating)) {
        throw new Error('Incorrect or missing rating');
    }

    return rating;
};

const isArray = (arr: unknown): arr is string[] => (
    Array.isArray(arr) || arr instanceof Array
);

const parseCodes = (codes: unknown): string[] => {
    if (!isArray(codes)) {
        throw new Error('Incorrect codes');
    }

    return codes;
};

export const toPatientId = (id: unknown): string => parseValue('id', id);

export const toNewPatient = (patient: any): NewPatient => ({
    name: parseValue('name', patient.name),
    dateOfBirth: parseDate(patient.dateOfBirth),
    ssn: parseValue('social security number', patient.ssn),
    gender: parseGender(patient.gender),
    occupation: parseValue('occupation', patient.occupation)
});

export const toNewEntry = (entry: any): Omit<NewEntry, "id"> => {
    const newEntry = {
        description: parseValue('description', entry.description),
        date: parseDate(entry.date),
        specialist: parseValue('specialist', entry.specialist),
        type: parseType(entry.type),
        diagnosisCodes: parseCodes(entry.diagnosisCodes)
    };

    switch(entry.type) {
        case "Hospital":
            if (entry.discharge.date) {
                return {
                    ...newEntry,
                    discharge: {
                        date: parseDate(entry.discharge.date),
                        criteria: parseValue('criteria', entry.discharge.criteria)
                    }
                };
            }

           return newEntry;
        case "OccupationalHealthcare":
            if (entry.sickLeave.startDate) {
                return {
                    ...newEntry,
                    employerName: parseValue('employer name', entry.employerName),
                    sickLeave: {
                        startDate: parseDate(entry.sickLeave.startDate),
                        endDate: parseDate(entry.sickLeave.endDate)
                    }
                };
            }
            
            return {
                ...newEntry,
                employerName: parseValue('employer name', entry.employerName)
            };
        case "HealthCheck":
            return {
                ...newEntry,
                healthCheckRating: parseRating(entry.healthCheckRating)
            };
        default: return newEntry;
    }
};