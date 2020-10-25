import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../types';

const getEntries = (): Diagnose[] => diagnoses;

export default {
    getEntries
};