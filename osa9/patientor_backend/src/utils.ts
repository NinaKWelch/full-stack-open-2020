/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from './types';

const isString = (text: any): text is string => (
    typeof text === 'string' || text instanceof String
);

const parseEntry = (param: string, entry: any): string => {
    if (!entry || !isString(entry)) {
        throw new Error(`Incorrect or missing ${param}`);
    }

    return entry;
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

const toNewPatient = (patient: any): NewPatient => ({
    name: parseEntry('name', patient.name),
    dateOfBirth: parseDate(patient.dateOfBirth),
    ssn: parseEntry('social security number', patient.ssn),
    gender: parseGender(patient.gender),
    occupation: parseEntry('occupation', patient.occupation)
});

export default toNewPatient;