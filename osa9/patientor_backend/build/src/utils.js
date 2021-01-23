"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toPatientId = exports.toNewPatient = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
const types_1 = require("./types");
const isString = (text) => (typeof text === 'string' || text instanceof String);
const parseValue = (key, value) => {
    if (!value || !isString(value)) {
        throw new Error(`Incorrect or missing ${key}`);
    }
    return value;
};
const isDate = (date) => Boolean(Date.parse(date));
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};
const isGender = (param) => (Object.values(types_1.Gender).includes(param));
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
const isType = (param) => (param === 'Hospital' ||
    param === 'OccupationalHealthcare' ||
    param === 'HealthCheck');
const parseType = (type) => {
    if (!type || !isType(type)) {
        throw new Error('Incorrect or missing type');
    }
    return type;
};
const isRating = (param) => (Object.values(types_1.HealthCheckRating).includes(param));
const parseRating = (rating) => {
    if (!rating || !isRating(rating)) {
        throw new Error('Incorrect or missing rating');
    }
    return rating;
};
const isArray = (arr) => (Array.isArray(arr) || arr instanceof Array);
const parseCodes = (codes) => {
    if (!isArray(codes)) {
        throw new Error('Incorrect codes');
    }
    return codes;
};
const toNewPatient = (patient) => ({
    name: parseValue('name', patient.name),
    dateOfBirth: parseDate(patient.dateOfBirth),
    ssn: parseValue('social security number', patient.ssn),
    gender: parseGender(patient.gender),
    occupation: parseValue('occupation', patient.occupation)
});
exports.toNewPatient = toNewPatient;
const toPatientId = (id) => parseValue('id', id);
exports.toPatientId = toPatientId;
const toNewEntry = (entry) => {
    const newEntry = {
        description: parseValue('description', entry.description),
        date: parseDate(entry.date),
        specialist: parseValue('specialist', entry.specialist),
        type: parseType(entry.type),
        diagnosisCodes: parseCodes(entry.diagnosisCodes)
    };
    switch (entry.type) {
        case "Hospital":
            if (entry.discharge.date) {
                return Object.assign(Object.assign({}, newEntry), { discharge: {
                        date: parseDate(entry.discharge.date),
                        criteria: parseValue('criteria', entry.discharge.criteria)
                    } });
            }
            return newEntry;
        case "OccupationalHealthcare":
            if (entry.sickLeave.startDate) {
                return Object.assign(Object.assign({}, newEntry), { employerName: parseValue('employer name', entry.employerName), sickLeave: {
                        startDate: parseDate(entry.sickLeave.startDate),
                        endDate: parseDate(entry.sickLeave.endDate)
                    } });
            }
            return Object.assign(Object.assign({}, newEntry), { employerName: parseValue('employer name', entry.employerName) });
        case "HealthCheck":
            return Object.assign(Object.assign({}, newEntry), { healthCheckRating: parseRating(entry.healthCheckRating) });
        default: return newEntry;
    }
};
exports.toNewEntry = toNewEntry;
