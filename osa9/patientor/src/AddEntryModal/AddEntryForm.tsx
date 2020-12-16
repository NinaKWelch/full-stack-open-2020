import React from "react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import FormFieldSelect, { SelectOption } from "../components/FormFieldSelect";
import FormFieldDate from "../components/FormFieldDate";
import FormFieldText from "../components/FormFieldText";
import { CombinedEntry, Type } from "../types";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import DiagnosisSelection from "./DiagnosisSelection";

// Types
export type EntryFormValues = Omit<CombinedEntry, "id">;

const typeOptions: SelectOption[] = [
  { value: Type.Hospital, label: "Hospital" },
  { value: Type.OccupationalHealthcare, label: "Occupational Healthcare" },
  { value: Type.HealthCheck, label: "HealthCheck" },
];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const PatientEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  const formStyle = {
    flexGrow: 1,
    maxWidth: 600,
    backgroundColor: "white",
    padding: "35px 25px",
  };

  return (
    <Formik
      initialValues={{
        type: Type.Hospital,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form style={formStyle}>
            <Grid container spacing={2}>
              <Field
                label="Type"
                name="type"
                options={typeOptions}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                component={FormFieldSelect}
              />
              <Field label="Date" name="date" component={FormFieldDate} />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={FormFieldText}
              />
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={FormFieldText}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
                codes={values.diagnosisCodes}
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
  );
};

export default PatientEntryForm;
