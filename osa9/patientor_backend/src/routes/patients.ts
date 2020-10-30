import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toPatientId } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPublicPatientData());
});

router.get('/:id', (req, res) => {
    try {
        const id = toPatientId(req.body.id);
        const patient = patientService.getPatient(id);
        
        patient ? res.send(patient) : res.status(404).end();
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);

        res.json(addedPatient);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

export default router;