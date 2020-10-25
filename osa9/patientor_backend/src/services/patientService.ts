import patients from '../../data/patients';
import { Patient, NonSensitivePatientInfo } from '../types';

const getEntries = (): Patient[] => patients;

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getEntries,
    getNonSensitivePatientInfo
};