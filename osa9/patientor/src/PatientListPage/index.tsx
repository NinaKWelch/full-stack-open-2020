import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";
import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import HealthRatingBar from "../components/HealthRatingBar";

const PatientListPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );

      dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
    } catch (err) {
      /*
          console.error(err.response.data);
          setError(err.response.data.error);
          */
    }
  };

  return (
    <div>
      <div>
        <h3>Patient list</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Occupation</th>
            <th>Health Rating</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(patients).map((patient: Patient) => (
            <tr key={patient.id}>
              <td>
                <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
              </td>
              <td>{patient.gender}</td>
              <td>{patient.occupation}</td>
              <td>
                <HealthRatingBar rating={1} showText={false} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <button onClick={() => openModal()}>Add New Patient</button>
    </div>
  );
};

export default PatientListPage;
