import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useStateValue } from "../state";
import { EntryFormValues, Type, HealthCheckRating } from "../types";
import EntryFormBase from "./EntryFormBase";
import EntryFormHospital from "./EntryFormHospital";
import EntryFormOccupationalHealthcare from "./EntryFormOccupationalHealthcare";
import EntryFormHealthCheck from "./EntryFormHealthCheck";
import EntryFormDiagnosis from "./EntryFormDiagnosis";

import { formStyle } from "../styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// Yup
const EntrySchema = Yup.object().shape({
  date: Yup.date().required("Date is required"),
  type: Yup.string(),
  specialist: Yup.string()
    .min(2, "Name is too short")
    .max(35, "Name is too long")
    .required("Specialist is required"),
  employerName: Yup.string()
    .when("type", {
      is: Type.OccupationalHealthcare,
      then: Yup.string().required("Employer is required"),
      otherwise: Yup.string(),
    })
    .max(35, "Employer name is too long"),
  diagnosisCodes: Yup.array(),
  description: Yup.string()
    .max(500, "Description is too long")
    .required("Description is required"),
  discharge: Yup.object().shape({
    date: Yup.date(),
    criteria: Yup.string()
      .min(2, "Text is too short")
      .max(250, "Text is too long"),
  }),
  sickLeave: Yup.object().shape({
    startDate: Yup.date(),
    endDate: Yup.date(),
  }),
  healthCheckRating: Yup.number(),
});

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const PatientEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: "",
        type: Type.Hospital,
        specialist: "",
        employerName: "",
        diagnosisCodes: [],
        description: "",
        discharge: {
          date: "",
          criteria: "",
        },
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validationSchema={EntrySchema}
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form style={formStyle}>
            <Grid container spacing={2}>
              <EntryFormBase />
              {values.type === Type.Hospital && <EntryFormHospital />}
              {values.type === Type.OccupationalHealthcare && (
                <EntryFormOccupationalHealthcare />
              )}
              {values.type === Type.HealthCheck && <EntryFormHealthCheck />}
              <EntryFormDiagnosis
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
