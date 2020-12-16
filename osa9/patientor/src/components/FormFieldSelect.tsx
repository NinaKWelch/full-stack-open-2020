import React from "react";
import { FieldProps } from "formik";
import { Type, Gender } from "../types";

import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

export type SelectOption = {
  value: Type | Gender;
  label: string;
};

interface SelectFieldProps extends FieldProps {
  label: string;
  options: SelectOption[];
}

const FormFieldSelect: React.FC<SelectFieldProps> = ({
  form,
  field,
  label,
  options,
}) => {
  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    form.setFieldValue(field.name, event.target.value);
  };

  return (
    <Grid item xs={12} sm={6}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="select">{label}</InputLabel>
        <Select
          native
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value={field.value}
          onChange={handleChange}
          label={label}
          inputProps={{
            name: field.name,
            id: "select",
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label || option.value}
            </option>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default FormFieldSelect;
