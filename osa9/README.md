# Exercises

## setup

Exercises 9.1.-9.7. will be all made to the same node project. Create the project in an empty directory with `npm init` and install the _ts-node_ and _typescript_ packages. Create also the file _tsconfig.json_ to the directory with the following content:

```
{
  "compilerOptions": {
    "noImplicitAny": true,
  }
}
```

The _tsconfig.json_ file is used to define how the TypeScript compiler should interpret the code, how strictly the compiler should work, which files to watch or ignore, and and [much much more](https://www.typescriptlang.org/docs/handbook/tsconfig-json.ht). For now we will only use the compiler option [noImplicitAny](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#noimplicitany), that makes it mandatory to have types for all variables used.

## 9.1 Body mass index

Create the code of this exercise to file _bmiCalculator.ts_

Write a function calculateBmi that counts [BMI](https://en.wikipedia.org/wiki/Body_mass_index) based on given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.

Call the function in the same file with hard-coded parameters and print out the result. The code `console.log(calculateBmi(180, 74))` should print the following message: `Normal (healthy weight)`.

Create a npm script for running the program with command `npm run calculateBmi`

## 9.2 Exercise calculator

Create the code of this exercise to file _exerciseCalculator.ts_

Write a function _calculateExercises_ that calculates the average time of **daily exercise hours** and compares it to the **target amount** of daily hours and returns an object that includes the following values:

- the number of days
- the number of training days
- the original target value
- the calculated average time
- boolean value describing if the target was reached
- a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
- a text value explaining the rating

The daily exercise hours are given to the function as an [array](https://www.typescriptlang.org/docs/handbook/basic-types.html#array) that contains the number of exercise hours for each day in the training period. Eg. a week with 3 hours of training on Monday, none on Tuesday, 2 hours on Wednesday, 4.5 hours on Thursday and so on would be represented by the following array:

```
[3, 0, 2, 4.5, 0, 3, 1]
```

For the Result object you should create an [interface](https://www.typescriptlang.org/docs/handbook/interfaces.html).

If you would call the function with parameters `[3, 0, 2, 4.5, 0, 3, 1]` and `2` it could return

```
{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }
```

Create a npm script `npm run calculateExercises` for calling the function with hard coded values.

## 9.3 Command line

Change the previous exercises so that you can give the parameters of _bmiCalculator_ and _exerciseCalculator_ as command line arguments.

Your program could work eg. as follows:

```
$ npm run calculateBmi 180 91

Overweight
```

and

```
$ npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4

{ periodLength: 9,
  trainingDays: 6,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.7222222222222223 }
```

In the example the **first argument** is the target value.

Handle exceptions and errors appropriately. The _exerciseCalculator_ should accept inputs of varied lengths. Determine by yourself how you manage to collect all needed input.

## 9.4 Express

Add _express_ to your dependencies and create a HTTP GET endpoint `hello` that answers 'Hello Full Stack!'

The web app should be started with command `npm start` in production mode and `npm run dev` in development mode that should use _ts-node-dev_ to run the app.

Replace also your existing _tsconfig.json_ file with the following content:

```
{
  "compilerOptions": {
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "strictBindCallApply": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "esModuleInterop": true,
    "declaration": true,
  }
}
```

make sure there are not any errors!

## 9.5 WebBMI

Add an endpoint for BMI-calculator that can be used by doing a HTTP GET request to endpoint _bmi_ and specifying the input with [query string parameters](https://en.wikipedia.org/wiki/Query_string). For example to get bmi for a person having height 180 and weight 72, the url is http://localhost:3002/bmi?height=180&weight=72

The response is a json of the form

```
{
  weight: 72,
  height: 180,
  bmi: "Normal (healthy weight)"
}
```
[
See the ]express documentation](http://expressjs.com/en/5x/api.html#req.query) for info how to access the query parameters.

If the query parameters of the request are of the wrong type or missing, response with proper status code and error message are given

```
{
  error: "malformatted parameters"
}
```

Do not copy the calculator code to file _index.ts_, make it a [typescript module](https://www.typescriptlang.org/docs/handbook/modules.html) that can be imported in _index.ts_.

## 9.6 Eslint

Configure your project to use the above eslint settings and fix all the warnings.

## 9.7 WebExercises

Add an endpoint to your app for the exercise calculator. It should be used by doing a HTTP POST request to endpoint _exercises_ with the input in the request body

```
{
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}
```

Response is a json of the following form

```
{
    "periodLength": 7,
    "trainingDays": 4,
    "success": false,
    "rating": 1,
    "ratingDescription": "bad",
    "target": 2.5,
    "average": 1.2142857142857142
}
```

If the body of the request is not of the right form, response with proper status code and error message is given. The error message is either

```
{
  error: "parameters missing"
}
```

or

```
{
  error: "malformatted parameters"
}
```

depending on the error. The latter happens if the input values do not have the right type, i.e. they are not numbers or convertable to numbers.

In this exercise you might find it beneficial to use the **explicit any** type when handling the data in the request body. Our eslint configuration is preventing this but you may unset this rule for a particular line by inserting the following comment as the previous line:

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Note that you need to have a [correct setup](https://fullstackopen.com/en/part3/node_js_and_express/#receiving-data) in order to get hold to the request body.

## setup

For next set of exercises you will be developing a backend for an existing project called **Patientor** which is a simple medical record application for doctors who handle diagnoses and basic health information of their patients.

The [frontend](https://github.com/fullstack-hy2020/patientor) has already been built by outsider experts and your task is to create a backend to support the existing code.

## 9.8 Patientor backend, step1

Initialise project that will be used by the frontend. Configure eslint and tsconfig with the same configurations that are used in the material. Define an endpoint that responses to HTTP GET requests to route /ping.

The project should be runnable with npm scripts both in development mode and as compiled code in production mode.

## 9.9 Patientor backend, step2

Fork and clone the project [patientor](https://github.com/fullstack-hy2020/patientor). Start the project with the help of the _README_ file. You should be able to use the frontend without a functioning backend.

Ensure that backend answers to the ping request that _frontend_ has made on startup. Check developer tool to make sure it really works:

![](https://fullstackopen.com/static/ecb7fbc31d1698f2ba09ee2ee77a4982/5a190/16a.png)

You might also want to have a look at the tab console. If something fails [part 3](https://fullstackopen.com/en/part3/) of the course shows how the problem can be solved.


## 9.10 Patientor backend, step3

Similarly to Ilari's flight service, we do not use a real database in our app but instead use hardcoded data, that is in the files [diagnoses.json](https://github.com/fullstack-hy2020/misc/blob/master/diagnoses.json) and [patients.json](https://github.com/fullstack-hy2020/misc/blob/master/patients.json). Get the files and store those into a directory called _data_ under your project. All data modification can be done in runtime memory, so during this part it is **not necessary** to write to a file.

Create a type _Diagnose_ and use it to create endpoint _/api/diagnoses_ for fetching all diagnoses with HTTP GET.

Structure your code properly by using meaningfully named directories and files.

Note that _diagnoses_ may or may not contain the field _latin_. You might want to use [optional properties](https://www.typescriptlang.org/docs/handbook/interfaces.html#optional-properties) in the type definition.

## 9.11 Patientor backend, step4

Create data type _Patient_ and set up a GET-endpoint _/api/patients_ that returns all patients to the frontend excluding field _ssn_. Use a [utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html) to make sure you are selecting and returning only the wanted fields.

In this exercise you may assume that field _gender_ has type `string`.

Try the endpoint with browser and ensure that _ssn_ is not included in the response:\

![](https://fullstackopen.com/static/bc4ce99035b5419acfa2d65698c5cb2d/5a190/22g.png)

After creating the endpoint, ensure that the _frontend_ shows the list of patients:

![](https://fullstackopen.com/static/c6b49beac1a640408462ec316e341d7e/5a190/22h.png)

## 9.12 Patientor backend, step5

Create a POST-endpoint _/api/patients_ for adding patients. Ensure that you can add patients also from the frontend.

## 9.13 Patientor backend, step6

Set up safe parsing, validation and type guards to the POST _/api/patients_ request.

Refactor the Gender field to use an [enum](https://www.typescriptlang.org/docs/handbook/enums.htmlcd documents_) type.