import React from "react";
import { Field, ErrorMessage, FieldProps } from "formik";

// import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';

interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

const FormFieldNumber: React.FC<NumberProps> = ({ field, label, min, max }) => (
  <div>
    <label>{label}</label>
    <Field {...field} type="number" min={min} max={max} />

    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </div>
);

export default FormFieldNumber;
