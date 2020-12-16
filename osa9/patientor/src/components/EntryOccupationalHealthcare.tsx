import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import EntryDiagnosis from "./EntryDiagnosis";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import EntryCard from "./EntryCard";

const EntryOccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => (
  <EntryCard type={entry.type} date={entry.date}>
    <CardContent>
      <Typography color="textSecondary" component="p">
        {entry.description}
      </Typography>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
        <EntryDiagnosis codes={entry.diagnosisCodes} />
      ) : null}
    </CardContent>
  </EntryCard>
);

export default EntryOccupationalHealthcare;
