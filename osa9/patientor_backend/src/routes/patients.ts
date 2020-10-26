import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatientData());
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