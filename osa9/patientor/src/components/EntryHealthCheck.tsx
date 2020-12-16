import React from "react";
import { HealthCheckEntry } from "../types";
import EntryDiagnosis from "./EntryDiagnosis";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import EntryCard from "./EntryCard";

const EntryHealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => (
  <EntryCard type={entry.type} date={entry.date}>
    <CardContent>
      <Typography color="textSecondary" component="p">
        {entry.description}
      </Typography>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
        <EntryDiagnosis codes={entry.diagnosisCodes} />
      ) : null}
      <p>{entry.healthCheckRating}</p>
    </CardContent>
  </EntryCard>
);

export default EntryHealthCheck;
