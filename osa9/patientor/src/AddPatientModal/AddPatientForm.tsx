import React from "react";
import { Field, Formik, Form } from "formik";
import FormFieldText from "../components/FormFieldText";
import FormFieldSelect, { SelectOption } from "../components/FormFieldSelect";
import FormFieldDate from "../components/FormFieldDate";
import { Gender, Patient } from "../types";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// Types
export type PatientFormValues = Omit<Patient, "id" | "entries">;

const genderOptions: SelectOption[] = [
  { value: Gender.Other, label: "Other" },
  { value: Gender.Male, label: "Male" },
  { value: Gender.Female, label: "Female" },
];

interface Props {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

const AddPatientForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const formStyle = {
    flexGrow: 1,
    maxWidth: 600,
    backgroundColor: "white",
    padding: "35px 25px",
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          ssn: "",
          dateOfBirth: "",
          occupation: "",
          gender: Gender.Other,
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.name) {
            errors.name = requiredError;
          }
          if (!values.ssn) {
            errors.ssn = requiredError;
          }
          if (!values.dateOfBirth) {
            errors.dateOfBirth = requiredError;
          }
          if (!values.occupation) {
            errors.occupation = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty }) => {
          return (
            <Form style={formStyle}>
              <Grid container spacing={2}>
                <Field
                  label="Name"
                  placeholder="Name"
                  name="name"
                  component={FormFieldText}
                />
                <Field
                  label="Gender"
                  name="gender"
                  options={genderOptions}
                  component={FormFieldSelect}
                />
                <Field
                  label="Date Of Birth"
                  name="dateOfBirth"
                  component={FormFieldDate}
                />
                <Field
                  label="Social Security Number"
                  placeholder="SSN"
                  name="ssn"
                  component={FormFieldText}
                />
                <Field
                  label="Occupation"
                  placeholder="Occupation"
                  name="occupation"
                  component={FormFieldText}
                />
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    size="large"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    type="button"
                    color="secondary"
                    variant="outlined"
                    size="large"
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddPatientForm;
