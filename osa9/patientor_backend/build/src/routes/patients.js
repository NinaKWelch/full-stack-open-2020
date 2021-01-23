"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPublicPatientData());
});
router.get('/:id', (req, res) => {
    try {
        const id = utils_1.toPatientId(req.params.id);
        const patient = patientService_1.default.getPatient(id);
        patient ? res.send(patient) : res.status(404).end();
    }
    catch (err) {
        err instanceof Error
            ? res.status(400).send(err.message)
            : res.status(500).send("Unknown Error");
    }
});
router.get('/:id/entries', (req, res) => {
    try {
        const id = utils_1.toPatientId(req.params.id);
        const patient = patientService_1.default.getPatient(id);
        patient ? res.send(patient.entries) : res.status(404).end();
    }
    catch (err) {
        err instanceof Error
            ? res.status(400).send(err.message)
            : res.status(500).send("Unknown Error");
    }
});
router.post('/', (req, res) => {
    try {
        const newPatient = utils_1.toNewPatient(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (err) {
        err instanceof Error
            ? res.status(400).send(err.message)
            : res.status(500).send("Unknown Error");
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const id = utils_1.toPatientId(req.params.id);
        const newEntry = utils_1.toNewEntry(req.body);
        const updatedEntries = patientService_1.default.addPatientEntry(id, newEntry);
        res.json(updatedEntries);
    }
    catch (err) {
        err instanceof Error
            ? res.status(400).send(err.message)
            : res.status(500).send("Unknown Error");
    }
});
exports.default = router;
