import React, { useState } from "react";
import { Field } from "formik";
import FormFieldDate from "../components/FormFieldDate";
import FormFieldTextArea from "../components/FormFieldTextArea";

import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const EntryFormHospital: React.FC = () => {
  const [discharge, setDischarge] = useState<boolean>(false);

  return (
    <>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={discharge}
              onChange={() => setDischarge(!discharge)}
              name="discharge"
              color="primary"
            />
          }
          label="Discharge form hospital"
        />
      </Grid>
      {discharge && (
        <>
          <Field
            id="entry-discharge-date"
            label="Discharge date"
            name="discharge.date"
            component={FormFieldDate}
          />
          <Field
            id="entry-discharge-criteriae"
            label="Criteria"
            placeholder="Criteria"
            name="discharge.criteria"
            component={FormFieldTextArea}
          />
        </>
      )}
    </>
  );
};

export default EntryFormHospital;
