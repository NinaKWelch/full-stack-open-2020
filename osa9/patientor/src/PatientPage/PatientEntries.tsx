import React from "react";
import { Entry } from "../types";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import AddEntryModal from "../AddEntryModal";
import EntryDetails from "../components/EntryDetails";
// import { OpenInFull } from '@material-ui/icons';

interface Props {
  entries: Entry[] | undefined;
  handleSubmit: (values: EntryFormValues) => void;
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
  error?: string;
}

const PatientEntries: React.FC<Props> = ({
  entries,
  handleSubmit,
  handleOpen,
  handleClose,
  open,
  error,
}) => (
  <Grid container>
    <Typography
      variant="h5"
      component="h4"
      color="textPrimary"
      style={{ marginRight: 25 }}
    >
      Entries
    </Typography>
    <AddEntryModal
      handleSubmit={handleSubmit}
      handleOpen={handleOpen}
      handleClose={handleClose}
      open={open}
      error={error}
    />
    <Grid container item xs={12} spacing={3} style={{ marginTop: 25 }}>
      {entries && entries.length > 0 ? (
        entries.map((entry) => <EntryDetails key={entry.id} entry={entry} />)
      ) : (
        <Typography color="textSecondary">No entries</Typography>
      )}
    </Grid>
  </Grid>
);

export default PatientEntries;
