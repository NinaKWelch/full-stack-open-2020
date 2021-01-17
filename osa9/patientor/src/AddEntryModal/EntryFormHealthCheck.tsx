import React from "react";
import { Field } from "formik";
import HealthRatingOptions from "./HealthRatingOptions";

const EntryFormHealthCheck: React.FC = () => (
  <Field
    label="Health Rating"
    name="healthCheckRating"
    component={HealthRatingOptions}
  />
);

export default EntryFormHealthCheck;
