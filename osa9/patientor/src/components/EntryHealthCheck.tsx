import React from "react";
import { HealthCheckEntry } from "../types";
import EntryCard from "./EntryCard";
import HealthRatingBar from "./HealthRatingBar";

import Typography from "@material-ui/core/Typography";

const EntryHealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => (
  <EntryCard
    type="Health Check"
    date={entry.date}
    description={entry.description}
    codes={entry.diagnosisCodes}
  >
    <Typography component="p">
      Health assessment:{" "}
      {<HealthRatingBar rating={entry.healthCheckRating} showText />}
    </Typography>
  </EntryCard>
);

export default EntryHealthCheck;
