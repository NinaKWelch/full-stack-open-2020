interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    target: number,
    average: number,
    rating: number,
    ratingDescription: string
}

const calculateExercises = (exercises: Array<number>, target: number): Result => {
    const total = exercises.reduce((a, b) => a + b, 0);
    const average = total / exercises.length;

    const getRating = () => {
        if (average < target / 2) {
            return { rating: 1, ratingDescription: 'you\'re far from your target' }
        } else if (average < target)  {
            return { rating: 2, ratingDescription: 'not too bad but could be better' }
        } else {
            return { rating: 3, ratingDescription: 'well done, you\'re on target' }
        }      
    };

    const rating = getRating();

    const stats = {
        periodLength: exercises.length,
        trainingDays: exercises.filter(e => e !== 0).length,
        success: average >= target,
        target,
        average
    }

    return { ...stats, ...rating }
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))