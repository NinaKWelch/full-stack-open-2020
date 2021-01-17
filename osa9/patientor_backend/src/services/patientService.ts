import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient, NewEntry, CombinedEntry } from '../types';

const getPatients = (): Patient[] => patients;

const getPatient = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);

    return patient ? patient : undefined;
};

const getPublicPatientData = (): PublicPatient[] => (
    patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
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

const addPatientEntry = (patientId: string, entry: NewEntry ): CombinedEntry[] | undefined => {
    const patient: Patient | undefined = patients.find(
        patient => patient.id === patientId
    );

    const newEntry = {
        id: getId(),
        ...entry
    };

    if(patient) {
        const updatedPatient = {
            ...patient,
            entries: [ ...patient.entries, newEntry ]
        };

        const updatedEntries = updatedPatient.entries;
        patients.filter(p => p.id !== updatedPatient.id ? patient : updatedPatient);
        
        return updatedEntries;
    }

    return undefined;
};

export default {
    getPatients,
    getPatient,
    getPublicPatientData,
    addPatient,
    addPatientEntry
};