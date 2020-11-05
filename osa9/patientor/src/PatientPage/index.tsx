import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch({ type: "UPDATE_PATIENT", payload: patientFromApi.id });
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

  if (!patient) {
    return <p>No such patient in the database.</p>;
  }

  return (
    <div>
      <h2>
        {patient.name}
        {getGender(patient.gender)}
      </h2>
      <ul>
        <li>Ssn: {patient.ssn}</li>
        <li>Occupation: {patient.occupation}</li>
      </ul>
    </div>
  );
};

export default PatientPage;
