import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toPatientId, toNewEntry } from '../utils';

const router = express.Router();

// get patient list
router.get('/', (_req, res) => {
    res.send(patientService.getPublicPatientData());
});

// get patient
router.get('/:id', (req, res) => {
    try {
        const id = toPatientId(req.params.id);
        const patient = patientService.getPatient(id);
        
        patient ? res.send(patient) : res.status(404).end();
    } catch (err: unknown) {
        err instanceof Error
            ? res.status(400).send(err.message)
            : res.status(500).send("Unknown Error");
    }
});

// get patient entries
router.get('/:id/entries', (req, res) => {
    try {
        const id = toPatientId(req.params.id);
        const patient = patientService.getPatient(id);
        
        patient ? res.send(patient.entries) : res.status(404).end();
    } catch (err: unknown) {
        err instanceof Error
            ? res.status(400).send(err.message)
            : res.status(500).send("Unknown Error");
    }
});

// add patient to patient list
router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);

        res.json(addedPatient);
    } catch (err: unknown) {
        err instanceof Error
            ? res.status(400).send(err.message)
            : res.status(500).send("Unknown Error");
    }
});

// add patient entry to patient
router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addPatientEntry(newEntry);

        res.json(addedEntry);
    } catch (err: unknown) {
        err instanceof Error
            ? res.status(400).send(err.message)
            : res.status(500).send("Unknown Error");
    }
});


// update patient
router.put('/:id', (req, res) => {
    try {
        const id = toPatientId(req.params.id);
        // the entry has already been parsed
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const entry = req.body;
        const updatedPatient = patientService.updatePatient(id, entry);
        
        res.json(updatedPatient);
    } catch (err: unknown) {
        err instanceof Error
            ? res.status(400).send(err.message)
            : res.status(500).send("Unknown Error");
    }   
});

export default router;