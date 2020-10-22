interface ExerciseValues {
    value: number;
    arr: Array<number>;
}

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    target: number;
    average: number;
    rating: number;
    ratingDescription: string;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Add a target and hours exercised for at least one day');
    if (args.length > 31) throw new Error('Maximum days that can be added is 28');

    const value = Number(args[2]);
    const arr = args.splice(3).map(Number);
  
    if (!isNaN(value) && !arr.some(isNaN)) {
       return { value, arr };
    } else {
        throw new Error('Provided values were not all numbers!');
    }
};

const calculateExercises = (target: number, exercises: Array<number>): Result => {
    const total = exercises.reduce((a, b) => a + b, 0);
    const average = total / exercises.length;

    const getRating = () => {
        if (average < target / 2) {
            return { rating: 1, ratingDescription: 'You\'re far from your target' };
        } else if (average < target)  {
            return { rating: 2, ratingDescription: 'Not too bad but could be better' };
        } else {
            return { rating: 3, ratingDescription: 'Well done, you\'re on target' };
        }      
    };

    const rating = getRating();

    const stats = {
        periodLength: exercises.length,
        trainingDays: exercises.filter(e => e !== 0).length,
        success: average >= target,
        target,
        average
    };

    return { ...stats, ...rating };
};

try {
    const { value, arr } = parseExerciseArguments(process.argv);

    console.log(calculateExercises(value, arr));
} catch(e) {
    console.log('Error message: ', (<Error>e).message);
}