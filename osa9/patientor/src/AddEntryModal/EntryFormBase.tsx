import React from "react";
import { Field } from "formik";
import { Type } from "../types";
import FormFieldSelect, { SelectOption } from "../components/FormFieldSelect";
import FormFieldText from "../components/FormFieldText";
import FormFieldDate from "../components/FormFieldDate";
import FormFieldTextArea from "../components/FormFieldTextArea";

const typeOptions: SelectOption[] = [
  { value: Type.Hospital, label: "Hospital" },
  { value: Type.OccupationalHealthcare, label: "Occupational Healthcare" },
  { value: Type.HealthCheck, label: "Health Check" },
];

const EntryFormBase: React.FC = () => (
  <>
    <Field
      label="Type"
      name="type"
      options={typeOptions}
      component={FormFieldSelect}
    />
    <Field
      id="entry-date"
      label="Date"
      name="date"
      component={FormFieldDate}
      required
    />
    <Field
      id="entry-description"
      label="Description"
      placeholder="Add description"
      name="description"
      component={FormFieldTextArea}
      required
    />
    <Field
      id="entry-specialist"
      label="Specialist"
      placeholder="Add specialist"
      name="specialist"
      component={FormFieldText}
      required
    />
  </>
);

export default EntryFormBase;
