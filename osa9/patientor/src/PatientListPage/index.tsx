import React, { useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue, addPatient } from "../state";
import { Patient, PatientFormValues } from "../types";
import PatientList from "./PatientList";
import AddPatientModal from "../AddPatientModal";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const PatientListPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const handleError = () => setError(undefined);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    handleError();
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );

      handleClose();
      dispatch(addPatient({ ...newPatient, healthRating: "Not given" }));
    } catch (err: unknown) {
      err instanceof Error ? setError(err.message) : setError("Unknown Error");
    }
  };

  return (
    <>
      <Grid container alignContent="center">
        <Typography
          variant="h4"
          component="h3"
          color="textPrimary"
          style={{ marginRight: 25 }}
        >
          Patients
        </Typography>
        <AddPatientModal
          handleSubmit={submitNewPatient}
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
          error={error}
        />
      </Grid>
      <PatientList patients={Object.values(patients)} />
    </>
  );
};

export default PatientListPage;
