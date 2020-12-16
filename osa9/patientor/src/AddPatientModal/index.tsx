import React from "react";
import AddPatientForm, { PatientFormValues } from "./AddPatientForm";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

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
      {error && <Typography color="secondary">Error: {error}</Typography>}
      <AddPatientForm onSubmit={handleSubmit} onCancel={handleClose} />
    </Dialog>
  </div>
);

export default AddPatentModal;
