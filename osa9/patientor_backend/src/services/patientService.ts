import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';

const getPatients = (): Patient[] => patients;

const getPatient = (id: string): PublicPatient | undefined => {
    const patient = patients.find(p => p.id === id);
    
    if (patient) {
        const publicPatient = {
            id: patient.id,
            name: patient.name,
            dateOfBirth: patient.dateOfBirth,
            gender: patient.gender,
            occupation: patient.occupation
        };
    
        return publicPatient;
    }

    return undefined;
};

const getPublicPatientData = (): PublicPatient[] => (
    patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }))
);

const getId = () => {
    const digits = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const arr = ['0', '0', '0'];
    const uuid = arr.reduce(a => a + digits[Math.floor(Math.random() * digits.length)], '');

    return `d2773${uuid}-f723-11e9-8f0b-362b9e155667`;
}; 

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: getId(),
        ...patient,
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getPatient,
    getPublicPatientData,
    addPatient
};
