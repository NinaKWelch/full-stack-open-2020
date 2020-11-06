import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';

const getPatients = (): Patient[] => patients;

const getPatient = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);

    return patient ? patient : undefined;
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
        entries: [],
        ...patient
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