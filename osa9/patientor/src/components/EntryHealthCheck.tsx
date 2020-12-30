import React from "react";
import { HealthCheckEntry } from "../types";
import EntryDiagnosis from "./EntryDiagnosis";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import EntryCard from "./EntryCard";

const EntryHealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const getRating = (num: number) => {
    switch (num) {
      case 0:
        return "healthy";
      case 1:
        return "low risk";
      case 2:
        return "high risk";
      case 3:
        return "critical risk";
      default:
        return "none made";
    }
  };

  return (
    <EntryCard type={entry.type} date={entry.date}>
      <CardContent>
        <Typography color="textSecondary" component="p">
          {entry.description}
        </Typography>
        {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
          <EntryDiagnosis codes={entry.diagnosisCodes} />
        ) : null}
        <Typography component="p">
          Health assessment: {getRating(entry.healthCheckRating)}
        </Typography>
      </CardContent>
    </EntryCard>
  );
};

export default EntryHealthCheck;
