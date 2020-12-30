import React, { useState } from "react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import FormFieldSelect, { SelectOption } from "../components/FormFieldSelect";
import FormFieldDate from "../components/FormFieldDate";
import FormFieldText from "../components/FormFieldText";
import DiagnosisSelection from "./DiagnosisSelection";
import HealthRating from "./HealthRating";

import { CombinedEntry, Type } from "../types";

import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

// Types
export type EntryFormValues = Omit<CombinedEntry, "id">;

const typeOptions: SelectOption[] = [
  { value: Type.Hospital, label: "Hospital" },
  { value: Type.OccupationalHealthcare, label: "Occupational Healthcare" },
  { value: Type.HealthCheck, label: "Health Check" },
];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const PatientEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  const [leave, setLeave] = useState<boolean>(false);
  const [discharge, setDischarge] = useState<boolean>(false);

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
        employerName: "",
        discharge: {
          date: "",
          criteria: "",
        },
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        healthCheckRating: 0,
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
        if (
          values.type === Type.OccupationalHealthcare &&
          !values.employerName
        ) {
          errors.employerName = requiredError;
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
              {values.type === Type.Hospital && (
                <>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={discharge}
                          onChange={() => setDischarge(!discharge)}
                          name="discharge"
                          color="primary"
                        />
                      }
                      label="Discharge form hospital"
                    />
                  </Grid>
                  {discharge && (
                    <>
                      <Field
                        label="Discharge date"
                        name="discharge.date"
                        component={FormFieldDate}
                      />
                      <Field
                        label="Criteria"
                        placeholder="Criteria"
                        name="discharge.criteria"
                        component={FormFieldText}
                      />
                    </>
                  )}
                </>
              )}
              {values.type === Type.OccupationalHealthcare && (
                <>
                  <Field
                    label="Employer Name"
                    placeholder="Employer Name"
                    name="employerName"
                    component={FormFieldText}
                  />
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={leave}
                          onChange={() => setLeave(!leave)}
                          name="sickLeave"
                          color="primary"
                        />
                      }
                      label="Assign sick leave"
                    />
                  </Grid>
                  {leave && (
                    <>
                      <Field
                        label="Start date"
                        name="sickLeave.startDate"
                        component={FormFieldDate}
                      />
                      <Field
                        label="End date"
                        name="sickLeave.endDate"
                        component={FormFieldDate}
                      />
                    </>
                  )}
                </>
              )}
              {values.type === Type.HealthCheck && (
                <Field
                  label="Health Rating"
                  name="healthCheckRating"
                  component={HealthRating}
                />
              )}
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
