/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender/*, Entry*/ } from './types';

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