import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { getDateRange } from "../utils";
import EntryCard from "./EntryCard";

import Typography from "@material-ui/core/Typography";

const EntryOccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => (
  <EntryCard
    type="Occupational Healthcare"
    date={entry.date}
    description={entry.description}
    codes={entry.diagnosisCodes}
  >
    <>
      {entry.sickLeave && (
        <Typography gutterBottom component="p">
          On sick leave{" "}
          {getDateRange(entry.sickLeave.startDate, entry.sickLeave.endDate)}.
        </Typography>
      )}
      <Typography component="p">Employer: {entry.employerName}</Typography>
    </>
  </EntryCard>
);

export default EntryOccupationalHealthcare;
