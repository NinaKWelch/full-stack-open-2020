import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import EntryDiagnosis from "./EntryDiagnosis";

const EntryOccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  const entryStyle = {
    border: "1px solid gray",
    padding: "0 15px 10px",
    marginBottom: 15,
  };

  return (
    <div style={entryStyle}>
      <h4>{entry.date} OCCUPATIONAL HEATHCARE</h4>
      <p>{entry.description}</p>
      {entry.diagnosisCodes ? (
        <EntryDiagnosis codes={entry.diagnosisCodes} />
      ) : (
        ""
      )}
    </div>
  );
};

export default EntryOccupationalHealthcare;
