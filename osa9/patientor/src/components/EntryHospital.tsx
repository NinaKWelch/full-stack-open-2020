import React from "react";
import { HospitalEntry } from "../types";
import { getDate } from "../utils";
import EntryCard from "./EntryCard";

import Typography from "@material-ui/core/Typography";

const EntryHospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
  <EntryCard
    type="Hospital"
    date={entry.date}
    description={entry.description}
    codes={entry.diagnosisCodes}
  >
    {entry.discharge ? (
      <>
        <Typography gutterBottom component="p">
          Discharged from hospital on {getDate(entry.discharge.date)}.
        </Typography>
        <Typography component="p">
          Discharge criteria: {entry.discharge.criteria}
        </Typography>
      </>
    ) : (
      ""
    )}
  </EntryCard>
);

export default EntryHospital;
