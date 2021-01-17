import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { PatientFormValues, Gender } from "../types";
import PatientFormBase from "./PatientFormBase";

import { formStyle } from "../styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// Yup
const PatientSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short")
    .max(35, "Name is too long")
    .required("Name is required"),
  dateOfBirth: Yup.date().required("DOB is required"),
  ssn: Yup.string().min(11).max(12).required("SSN is required"),
  occupation: Yup.string().min(4).max(35).required("Occupation is required"),
});

interface Props {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

const AddPatientForm: React.FC<Props> = ({ onSubmit, onCancel }) => (
  <div>
    <Formik
      initialValues={{
        name: "",
        dateOfBirth: "",
        ssn: "",
        gender: Gender.Other,
        occupation: "",
      }}
      onSubmit={onSubmit}
      validationSchema={PatientSchema}
    >
      {({ isValid, dirty }) => {
        return (
          <Form style={formStyle}>
            <Grid container spacing={2}>
              <PatientFormBase />
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

export default AddPatientForm;
