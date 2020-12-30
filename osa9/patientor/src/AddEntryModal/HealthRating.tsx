import React from "react";
import { FieldProps } from "formik";

import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

interface HealthRatingProps extends FieldProps {
  label: string;
}

const HealthRating: React.FC<HealthRatingProps> = ({ form, field, label }) => {
  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const number = Number(event.target.value);
    form.setFieldValue(field.name, number);
  };

  return (
    <Grid item xs={12}>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          name={field.name}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value={field.value}
          onChange={handleChange}
          aria-label="health"
          row
        >
          <FormControlLabel value={0} control={<Radio />} label="Healthy" />
          <FormControlLabel value={1} control={<Radio />} label="Low risk" />
          <FormControlLabel value={2} control={<Radio />} label="High risk" />
          <FormControlLabel
            value={3}
            control={<Radio />}
            label="Critical risk"
          />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};

export default HealthRating;
