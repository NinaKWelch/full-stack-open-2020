import React from "react";
import { PatientFormValues } from "../types";
import AddPatientForm from "./AddPatientForm";
import ErrorMessage from "../components/ErrorMessage";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

interface Props {
  handleSubmit: (values: PatientFormValues) => void;
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
  error?: string;
}

const AddPatentModal: React.FC<Props> = ({
  handleSubmit,
  handleOpen,
  handleClose,
  open,
  error,
}) => (
  <div>
    <Button type="button" variant="outlined" onClick={handleOpen}>
      Add New Patient
    </Button>
    <Dialog
      open={open}
      onClose={handleClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AddPatientForm onSubmit={handleSubmit} onCancel={handleClose} />
      {error && <ErrorMessage error={error} />}
    </Dialog>
  </div>
);

export default AddPatentModal;
