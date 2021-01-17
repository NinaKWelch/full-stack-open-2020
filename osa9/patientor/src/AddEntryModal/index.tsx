import React from "react";
import { EntryFormValues } from "../types";
import AddEntryForm from "./AddEntryForm";
import ErrorMessage from "../components/ErrorMessage";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

interface Props {
  handleSubmit: (values: EntryFormValues) => void;
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
  error?: string;
}

const AddEntryModal: React.FC<Props> = ({
  handleSubmit,
  handleOpen,
  handleClose,
  open,
  error,
}) => (
  <div>
    <Button type="button" variant="outlined" onClick={handleOpen}>
      Add New Entry
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
      <AddEntryForm onSubmit={handleSubmit} onCancel={handleClose} />
      {error && <ErrorMessage error={error} />}
    </Dialog>
  </div>
);

export default AddEntryModal;
