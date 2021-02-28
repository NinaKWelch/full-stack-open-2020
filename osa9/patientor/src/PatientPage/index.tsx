import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient, addPatient } from "../state";
import { Patient, Entry, EntryFormValues } from "../types";
import PatientDetails from "./PatientDetails";
import PatientEntries from "./PatientEntries";

import Typography from "@material-ui/core/Typography";

const PatientPage: React.FC<{ handlePatientList: () => void }> = ({
  handlePatientList,
}) => {
  const [{ patients, patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const handleOpen = () => setOpen(true);

  const handleError = () => setError(undefined);

  const handleClose = () => {
    setOpen(false);
    handleError();
  };

  const fetchPatientListFromAPI = () => {
    handlePatientList();
  };

  const fetchPatientFromAPI = async () => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );

      dispatch(updatePatient(patientFromApi));
      setLoading(true);
    } catch (err: unknown) {
      err instanceof Error ? setError(err.message) : setError("Unknown Error");
    }
  };

  const updatePatientToAPI = async (id: string, entry: Entry) => {
    try {
      const { data: patientFromApi } = await axios.put<Patient>(
        `${apiBaseUrl}/patients/${id}`,
        entry
      );

      // update patients state
      if (entry.type === "HealthCheck") {
        // if new entry type is health check
        // change patient's health check rating
        dispatch(
          addPatient({
            ...patientFromApi,
            healthRating: entry.healthCheckRating,
          })
        );
      } else {
        dispatch(addPatient(patientFromApi));
      }

      // update patient state
      dispatch(updatePatient(patientFromApi));
    } catch (err: unknown) {
      err instanceof Error ? setError(err.message) : setError("Unknown Error");
    }
  };

  useEffect(() => {
    const fetchPatient = () => {
      if (!patient || (patient && patient.id !== id)) {
        const checkPatientList = Object.keys(patients).includes(id);

        checkPatientList ? void fetchPatientFromAPI() : setLoading(false);
      }
    };

    // fetch patients form API
    // when state does not presist
    // (ie. browser refresh or direct link)
    Object.keys(patients).length > 1
      ? fetchPatient()
      : fetchPatientListFromAPI();
  }, [patient, patients]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      // update patient info
      void updatePatientToAPI(id, newEntry);
      handleClose();
    } catch (err: unknown) {
      err instanceof Error ? setError(err.message) : setError("Unknown Error");
    }
  };

  // initially loading is set to true
  // after first fetch, loading is set to false
  if ((!patient && loading) || (patient && patient.id !== id)) {
    return <Typography>Loading...</Typography>;
  }

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
