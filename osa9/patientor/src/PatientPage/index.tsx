import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { Patient, EntryFormValues } from "../types";
import PatientDetails from "./PatientDetails";
import PatientEntries from "./PatientEntries";

import Typography from "@material-ui/core/Typography";

const PatientPage: React.FC = () => {
  const [{ patients, patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const handleOpen = () => setOpen(true);

  const handleError = () => setError(undefined);

  const handleClose = () => {
    setOpen(false);
    handleError();
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(updatePatient(patientFromApi));
      } catch (err: unknown) {
        err instanceof Error
          ? setError(err.message)
          : setError("Unknown Error");
      }
    };

    if (!patient || patient.id !== id) {
      const checkPatientList = Object.keys(patients).includes(id);

      checkPatientList ? void fetchPatient() : null;
    }
  }, [patient]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedEntries } = await axios.post<Patient["entries"]>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      if (patient) {
        const updatedPatient = {
          ...patient,
          entries: updatedEntries,
        };

        handleClose();
        dispatch(updatePatient(updatedPatient));
      }
    } catch (err: unknown) {
      err instanceof Error ? setError(err.message) : setError("Unknown Error");
    }
  };

  if (!patient) {
    return <Typography>No such patient exist in the database.</Typography>;
  }

  return (
    <>
      <PatientDetails patient={patient} />
      <PatientEntries
        entries={patient.entries}
        handleSubmit={submitNewEntry}
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        error={error}
      />
    </>
  );
};

export default PatientPage;
