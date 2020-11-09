import React from "react";
import { HealthCheckEntry } from "../types";
import EntryDiagnosis from "./EntryDiagnosis";

const EntryHealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const entryStyle = {
    border: "1px solid gray",
    padding: "0 15px 10px",
    marginBottom: 15,
  };

  return (
    <div style={entryStyle}>
      <h4>{entry.date} HEATH CHECK</h4>
      <p>{entry.description}</p>
      {entry.diagnosisCodes ? (
        <EntryDiagnosis codes={entry.diagnosisCodes} />
      ) : (
        ""
      )}
      <p>{entry.healthCheckRating}</p>
    </div>
  );
};

export default EntryHealthCheck;
