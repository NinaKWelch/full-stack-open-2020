import React from "react";
import { Entry, EntryFormValues } from "../types";
import AddEntryModal from "../AddEntryModal";
import EntryDetails from "../components/EntryDetails";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

interface EntryProps {
  entries: Entry[] | undefined;
  handleSubmit: (values: EntryFormValues) => void;
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
  error?: string;
}

const PatientEntries: React.FC<EntryProps> = ({
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
        <Typography
          component="h6"
          color="textSecondary"
          style={{ marginLeft: 15 }}
        >
          No entries
        </Typography>
      )}
    </Grid>
  </Grid>
);

export default PatientEntries;
