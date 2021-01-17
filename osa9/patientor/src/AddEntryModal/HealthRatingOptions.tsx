import React from "react";
import { FieldProps } from "formik";

import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

interface Props extends FieldProps<{ value: number }> {
  label: string;
}

const HealthRatingOptions: React.FC<Props> = ({ form, field, label }) => {
  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    // change event target value to number
    const num = Number(event.target.value);

    form.setFieldValue(field.name, num);
  };

  return (
    <Grid item xs={12}>
      <FormControl fullWidth component="fieldset" margin="dense">
        <FormLabel component="legend" disabled>
          {label}
        </FormLabel>
        <RadioGroup
          row
          aria-label="health rating"
          value={field.value}
          onChange={handleChange}
        >
          <FormControlLabel value={1} control={<Radio />} label="Healthy" />
          <FormControlLabel value={2} control={<Radio />} label="Low risk" />
          <FormControlLabel value={3} control={<Radio />} label="High risk" />
          <FormControlLabel
            value={4}
            control={<Radio />}
            label="Critical risk"
          />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};

export default HealthRatingOptions;
