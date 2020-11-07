import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { Patient, BaseEntry, Diagnosis } from "../types";

const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(updatePatient(patientFromApi));
      } catch (err) {
        console.error(err);
      }
    };

    if (!patient || patient.id !== id) {
      void fetchPatient();
    }
  }, [patient]);

  const getGender = (option: string) => {
    switch (option) {
      case "male":
        return "MALE";
      case "female":
        return "FEMALE";
      default:
        return "OTHER";
    }
  };

  const checkCodes = (codes: Array<Diagnosis["code"]> | undefined) => {
    if (!codes) {
      return "";
    }

    return codes.map((code: Diagnosis["code"]) => <li key={code}>{code}</li>);
  };

  if (!patient) {
    return <p>No such patient in the database.</p>;
  }

  return (
    <div>
      <h2>
        {patient.name} | {getGender(patient.gender)}
      </h2>
      <ul>
        <li>Ssn: {patient.ssn}</li>
        <li>Occupation: {patient.occupation}</li>
      </ul>
      <h4>Entries</h4>
      {patient.entries && patient.entries.length > 0 ? (
        patient.entries.map((entry: BaseEntry) => (
          <div key={entry.id}>
            <p>
              {entry.date} {entry.description}
            </p>
            <ul>{checkCodes(entry.diagnosisCodes)}</ul>
          </div>
        ))
      ) : (
        <p>No entries</p>
      )}
    </div>
  );
};

export default PatientPage;
