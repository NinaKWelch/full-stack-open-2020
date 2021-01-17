import React from "react";
import { useStateValue } from "../state";
import { Diagnosis } from "../types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const EntryDiagnosis: React.FC<{ codes: Array<Diagnosis["code"]> }> = ({
  codes,
}) => {
  const [{ diagnoses }] = useStateValue();

  const diagnosisData = Object.values(diagnoses).filter((diagnosis) =>
    codes.includes(diagnosis.code)
  );

  return (
    <>
      <Typography variant="h6">Diagnosis:</Typography>
      <List disablePadding>
        {diagnosisData.map((diagnosis) => (
          <ListItem key={diagnosis.code}>
            <ListItemText primary={diagnosis.name} secondary={diagnosis.code} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default EntryDiagnosis;
