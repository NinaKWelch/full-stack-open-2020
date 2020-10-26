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

## 9.14

Create a new Create React App with TypeScript, and set up eslint for the project similarly to how we just did.

This exercise is similar to the one you have already done in [Part 1](https://fullstackopen.com/en/part1/java_script#exercises-1-3-1-5) of the course, but with TypeScript and some extra tweaks. Start off by modifying the contents of _index.tsx_ to the following:

```
import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <h1>{courseName}</h1>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

and remove the unnecessary files.

The whole app is now in one component. That is not what we want, so refactor the code so that it consists of three components: _Header_, _Content_ and _Total_. All data is still kept in the _App_ component, which passes all necessary data to each component as props. Be sure to add type declarations for each component's props!

The _Header_ component should take care of rendering the name of the course. _Content_ should render the names of the different parts and the amount of exercises in each part, and _Total_ should render the total sum of exercises in all parts.

The _App_ component should look somewhat like this:

```
const App = () => {
  // const-declarations

  return (
    <div>
      <Header name={courseName} />
      <Content ... />
      <Total ... />
    </div>
  )
};
```

## 9.15

First add the type information to _index.tsx_ and replace the variable `courseParts` with the one from the example below.

```
// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals";
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  }
];
```

Now we know that both interfaces `CoursePartOne` and `CoursePartThree` share not only the base attributes, but also an attribute called `description`, which is a string in both interfaces.

Your first task is to to declare a new interface, that includes the `description` attribute and extends the `CoursePartBase` interface. Then modify the code so that you can remove the `description` attribute from both `CoursePartOne` and `C`oursePartThree` without getting any errors.

Then create a component _Part_ that renders all attributes of each type of course part. Use a switch case -based exhaustive type checking! Use the new component in component _Content_.

Lastly, add your own course part interface with at least the following attributes: `name`, `exerciseCount` and `description`. Then add that interface to the type union `CoursePart` and add corresponding data to the `courseParts` variable. Now if you have not modified your _Content_ component correctly, you should get an error, because you have not yet added support for the fourth course part type. Do the necessary changes to _Content_, so that all attributes for the new course part also get rendered and that the compiler doesn't produce any errors.

## setup

We will soon add new type `_`Entry` for our app that represents a light weight patient journal entry. It consists of journal text i.e. description, creation date, information regarding the specialist who created it and possible diagnosis codes. Diagnosis codes map to the ICD-10 codes returned from the _/api/diagnoses endpoint_. Our naive implementation will be that a patient has an array of entries.

Before going into this, let us do some preparatory work.

## 9.16 Patientor, step1

Create an endpoint _/api/patients/:id_ that returns all of the patient information for one patient, including the array of patient entries that is still empty for all the patients. For the time being, expand the backend types as follows:

```
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >
```

Response should look as follows:

![](https://fullstackopen.com/static/ad0b2c4fbc560a07305bb3de1d56578c/5a190/38a.png)

## 9.17 Patientor, step2

Create a page for showing a patient's full information in the frontend.

User should be able to access a patient's information e.g by clicking the patient's name.

Fetch the data from the enpoint created in the previous exercise. After fetching the patient information from the backend, add the fetched information to the application's state. Do not fetch the information if it already is in the app state, i.e. if the user is visiting the same patient's information many times.

Since we now have the state in the context, you'll need to define a new action type for updating an individual patient's data.

The Application uses [Semantic UI React](https://react.semantic-ui.com/) for styling, which is quite similar to [React Bootstrap](https://react-bootstrap.github.io/) and [MaterialUI](https://material-ui.com/) that we covered in [part 7](https://fullstackopen.com/en/part7/more_about_styles). You may also use it for the new components but that is up to you since our main focus now is Typescript.

The Application also uses [react router](https://reacttraining.com/react-router/web/guides/quick-start) to control which view is visible in the frontend. You might want to have a look at [part 7](https://fullstackopen.com/en/part7/react_router) if you don't yet have a grasp on how the router works.

The result could look like this:

![](https://fullstackopen.com/static/56aa899fe44bc11ec3a3235ac9007834/5a190/39a.png)

The gender is shown with react-semantic-ui component [Icon](https://react.semantic-ui.com/elements/icon/#gendersicons-can-represent-genders-or-types-of-sexuality)

Note that in order to access the id in the url, you need to give [useParams](https://reacttraining.com/react-router/web/api/Hooks/useparams) a proper type argument:

```
const { id } = useParams<{ id: string }>();
```

## 9.18 Patientor, step3

Currently we create the `action` objects wherever we dispatch the actions, e.g. component _App_ has the following:

```
dispatch({
  type: "SET_PATIENT_LIST", payload: patientListFromApi
});
```

Refactor the code to use [action creator](https://fullstackopen.com/en/part6/flux_architecture_and_redux#action-creators) functions that are all defined in the file _reducer.tsx_.

For example the _App_ changes like this:

```
import { useStateValue, setPatientList } from "./state";

// ...

dispatch(setPatientList(patientListFromApi));
```

## 9.19 Patientor, step4

Define the types `OccupationalHealthCareEntry` and `HospitalEntry` so that those conform with the example data. Ensure that your backend returns the entries properly when you go to a individual patient's route

![](https://fullstackopen.com/static/21b5816433d1a5aeaf15bdac4f528d77/5a190/40.png)

Use types properly in the backend! For now there is no need to do a proper validation for all the fields of the entries in the backend, it is enough e.g. to check that the field `type` has a correct value.

## 9.20 Patientor, step5

Extend a patient's page in the frontend to list the `date`, `description` and `diagnose` codes of the patient's entries.

You can use the same type definition for an `Entry `in the frontend. For these exercises it is enough just to copy/paste the definitions from the backend to the frontend.

Your solution could look like this:

![](https://fullstackopen.com/static/bc5d529ae2163ff75b844c5c014ad074/5a190/41.png)

## 9.21 Patientor, step6

Fetch and add diagnoses to application state from _/api/diagnosis_ endpoint. Use the new diagnosis data to show the descriptions for patient's diagnosis codes:

![](https://fullstackopen.com/static/6d08345c7fd0b3141e9de139f3ec87b0/5a190/42.png)

## 9.22 Patientor, step7

Extend the entry-listing in the patient page to include the `Entry`'s details with a new component that shows rest of the information of the patients entries distinguishing different types from each other.

You could use eg. [Icon](https://react.semantic-ui.com/elements/icon/) or some other SemanticUI component the get appropriate visuals for your listing.

You should use a `switch case` based rendering and _exhaustive type checking_ so that no cases can be forgotten.

Like this:

![](https://fullstackopen.com/static/97edaf23398bcd60caf2b0338f9f8135/5a190/35c.png)

The resulting entries in the listing could look something like this:

![](https://fullstackopen.com/static/6c81f869cc8bee05bdbdb588fbec1ddb/5a190/36a.png)

## 9.23 Patientor, step8

We have established that patients can have different kinds of entries. We don't yet have any way of adding entries to patients in our app, so at the moment it is pretty useless as an electronic medical record.

Your next task is to add an endpoint _/api/patients/:id/entries_ to your backend, through which you can POST an entry for a patient.

Remember that we have different kinds of entries in our app, so our backend should support all those types and check that at least all required fields are given for each type.

## 9.24 Patientor, step9

Now that our backend supports adding entries, we want to add the corresponding functionality to the frontend. In this exercise you should add a form for adding an entry to a patient. An intuitive place for accessing the form would be on a patient's page.

In this exercise it is enough to support **one** entry type, and you do not have to handle any errors. It is enough if a new entry can be created when the form is filled with valid data.

Upon a successful submit the new entry should be added to the correct patient and the patient's entries on the patient page should be updated to contain the new entry.

If you like, you can re-use some of the code from the Add patient form for this exercise, but this is not a requirement.

Note that the file [FormField.tsx](https://github.com/fullstack-hy2020/patientor/blob/master/src/AddPatientModal/FormField.tsx#L58) has a ready made component _DiagnosisSelection_ that can be used for setting the field diagnoses.

It can be used as follows:

```
const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue()

  return (
    <Formik
    initialValues={{
      /// ...
    }}
    onSubmit={onSubmit}
    validate={values => {
      /// ...
    }}
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
          // ...

          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />    

          // ...
        </Form>
      );
    }}
  </Formik>
  );
};
```

There is also ready-made component _NumberField_ for the numeric values with a limited range

```
<Field
  label="healthCheckRating"
  name="healthCheckRating"
  component={NumberField}
  min={0}
  max={3}
/>
```

## 9.25 Patientor, step10

Extend your solution so that it displays an error message if some required values are missing or formatted incorrectly.

## 9.26 Patientor, step11

Extend your solution so that it supports **two** entry types and displays an error message if some required values are missing or formatted incorrectly. You do not need to care about the possible errors in the server's response.

The easiest but surely not the most elegant way to do this exercise is to have a separate form for each different entry type. Getting the types to work properly might be a slight challenge if you use just a single form.

## 9.27 Patientor, step12

Extend your solution so that it supports **all the entry types** and displays an error message if some required values are missing or formatted incorrectly. You do not need to care about the possible errors in the server's response.