import React from "react";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

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
      {error && <Typography color="secondary">Error: {error}</Typography>}
      <AddEntryForm onSubmit={handleSubmit} onCancel={handleClose} />
    </Dialog>
  </div>
);

export default AddEntryModal;
