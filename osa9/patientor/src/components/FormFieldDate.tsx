import React from "react";
import { ErrorMessage, FieldProps } from "formik";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

interface DateProps extends FieldProps {
  label: string;
}

const FormFieldDate: React.FC<DateProps> = ({ field, label }) => (
  <Grid item xs={12} sm={6}>
    <TextField
      id={field.name}
      label={label}
      InputLabelProps={{
        shrink: true,
      }}
      type="date"
      fullWidth
      required
      {...field}
    />
    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </Grid>
);

export default FormFieldDate;
