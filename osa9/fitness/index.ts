import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (!height || !weight) {
        res.status(400).send({ error: 'missing parameters' });
    }

    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        res.status(400).send({ error: 'malformatted parameters' });
    }

    const bmi = calculateBmi(Number(height), Number(weight));

    res.send({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!target || !daily_exercises ) {
        res.status(400).send({ error: 'missing parameters' });
    }
    
    if (Array.isArray(daily_exercises) && daily_exercises.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const exercises: Array<any> = daily_exercises.map(Number);
       
        if (isNaN(Number(target)) || exercises.some(isNaN)) {
            res.status(400).send({ error: 'malformatted parameters' });
        }

        const data = calculateExercises(Number(target), exercises);

        res.json(data);
    } else {
        res.status(400).send({ error: 'malformatted parameters' });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});