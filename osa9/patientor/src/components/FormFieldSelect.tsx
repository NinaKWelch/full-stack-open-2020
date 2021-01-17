import React from "react";
import { FieldProps } from "formik";
import { Type, Gender } from "../types";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

// Types
export type SelectOption = {
  value: Type | Gender;
  label: string;
};

interface Props extends FieldProps {
  label: string;
  options: SelectOption[];
}

const FormFieldSelect: React.FC<Props> = ({ field, label, options }) => (
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      select
      id={`select-${field.name}`}
      label={label}
      {...field}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </TextField>
  </Grid>
);

export default FormFieldSelect;
