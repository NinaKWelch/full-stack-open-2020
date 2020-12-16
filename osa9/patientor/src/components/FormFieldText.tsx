import React from "react";
import { ErrorMessage, FieldProps } from "formik";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

const FromFieldText: React.FC<TextProps> = ({ field, label, placeholder }) => (
  <Grid item xs={12}>
    <TextField
      id={field.name}
      label={label}
      placeholder={placeholder}
      fullWidth
      required
      {...field}
    />
    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </Grid>
);

export default FromFieldText;
