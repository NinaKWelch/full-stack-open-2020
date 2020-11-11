/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, NewEntry, EntryType, HealthCheckRating } from './types';

const isString = (text: any): text is string => (
    typeof text === 'string' || text instanceof String
);

const parseValue = (key: string, value: any): string => {
    if (!value || !isString(value)) {
        throw new Error(`Incorrect or missing ${key}`);
    }

    return value;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));
 
const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of birth');
    }

    return date;
};

const isGender = (param: any): param is Gender => (
    Object.values(Gender).includes(param)
);

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }

    return gender;
};

const isType = (param: any): param is EntryType => (
    param === 'Hospital' || 
    param === 'OccupationalHealthcare' ||
    param === 'HealthCheck'
);


const parseType = (type: any): EntryType => {
    if (!type || !isType(type)) {
        throw new Error('Incorrect or missing type');
    }

    return type;
};

const isRating = (param: any): param is HealthCheckRating => (
    Object.values(HealthCheckRating).includes(param)
);

const parseRating = (rating: any): HealthCheckRating => {
    if (!rating || !isRating(rating)) {
        throw new Error('Incorrect or missing rating');
    }

    return rating;
};

/*
const isArray = (arr: any): arr is Entry[] => (
    Array.isArray(arr) || arr instanceof Array
);

const parseEntries = (entries: any): Entry[] => {
    if (!entries || !isArray(entries)) {
        throw new Error(`Incorrect or missing entries`);
    }

    return entries;
};
*/

export const toNewPatient = (patient: any): NewPatient => ({
    name: parseValue('name', patient.name),
    dateOfBirth: parseDate(patient.dateOfBirth),
    ssn: parseValue('social security number', patient.ssn),
    gender: parseGender(patient.gender),
    occupation: parseValue('occupation', patient.occupation)
});

export const toPatientId = (id: any): string => parseValue('id', id);

export const toNewEntry = (entry: any): NewEntry => {
    const newEntry = {
        description: parseValue('description', entry.description),
        date: parseDate(entry.date),
        specialist: parseValue('specialist', entry.specialist),
        type: parseType(entry.type)
    };

    switch(entry.type) {
        case "OccupationalHealthcare":
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