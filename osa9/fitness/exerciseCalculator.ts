interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (exercises: Array<number>, target: number): Result => {
    const total = exercises.reduce((a, b) => a + b, 0);
    const average = total / exercises.length;
  
    const ratings = () => {
        if (average < target / 2) {
            return 1
        } else if (average < target)  {
            return 2
        } else {
            return 3
        }
    }

    const rating = ratings()

    const ratingDescriptions = () => {
        switch(rating) {
            case 1:
                return 'you\'re far from your target';
            case 2:
                return 'not too bad but could be better'
            case 3:
                return 'well done, you\'re on target';
            default:
                return 'something went wrong';
        }
    }

    const stats = {
        periodLength: exercises.length,
        trainingDays: exercises.filter(e => e !== 0).length,
        success: average >= target,
        rating,
        ratingDescription: ratingDescriptions(),
        target,
        average
    }

    return stats;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))