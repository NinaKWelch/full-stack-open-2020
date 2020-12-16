import React from "react";
import { Entry } from "../types";

import EntryHospital from "./EntryHospital";
import EntryOccupationalHealthcare from "./EntryOccupationalHealthcare";
import EntryHealthCheck from "./EntryHealthCheck";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <EntryHospital entry={entry} />;
    case "OccupationalHealthcare":
      return <EntryOccupationalHealthcare entry={entry} />;
    case "HealthCheck":
      return <EntryHealthCheck entry={entry} />;
    default:
      /* https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript */
      ((entry: string): never => {
        throw new Error(`${entry} is an unknown entry type`);
      })(entry);
  }
};

export default EntryDetails;
