import React from "react";
import AddPatientForm, { PatientFormValues } from "./AddPatientForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

const AddPatientModal: React.FC<Props> = ({
  modalOpen,
  onSubmit,
  error,
  onClose,
}) => (
  <dialog open={modalOpen}>
    <h2>Add a new patient</h2>
    {error && <p color="red">{`Error: ${error}`}</p>}
    <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
  </dialog>
);

export default AddPatientModal;
