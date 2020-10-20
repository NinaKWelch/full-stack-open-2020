interface BmiValues {
    value1: number;
    value2: number;
}

const parseBmiArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    const value1 = Number(args[2])
    const value2 = Number(args[3])
        
    if (!isNaN(value1) && !isNaN(value2)) {
        if (value1 < 35 || value2 < 2.5) {
            throw new Error('Please enter height (in centimeters) and weight (in kilograms)');
        } else {
            return { value1, value2 }
        }
    } else {
        throw new Error('Provided values were not all numbers!');
    }
}

const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / Math.pow((height / 100), 2);

    if (bmi > 25) {
        return 'Overweight'
    } else if (bmi < 18.5) {
        return 'Underweight'
    } else {
        return 'Normal (healthy weight)'
    } 
}

try {
    const { value1, value2 } = parseBmiArguments(process.argv);

    console.log(calculateBmi(value1, value2));
} catch(err) {
    console.log('Error message: ', err.message);
}