import diagnosis from '../../data/diagnosis';
import { Diagnosis } from '../types';

const getDiagnosis = (): Diagnosis[] => diagnosis;

export default {
    getDiagnosis
};