import React from "react";
import { Field } from "formik";
import { Gender } from "../types";
import FormFieldSelect, { SelectOption } from "../components/FormFieldSelect";
import FormFieldText from "../components/FormFieldText";
import FormFieldDate from "../components/FormFieldDate";

const genderOptions: SelectOption[] = [
  { value: Gender.Other, label: "Other" },
  { value: Gender.Male, label: "Male" },
  { value: Gender.Female, label: "Female" },
];

const PatientFormBase: React.FC = () => {
  return (
    <>
      <Field
        id="patient-name"
        label="Name"
        placeholder="Name"
        name="name"
        component={FormFieldText}
        required
      />
      <Field
        id="patient-gender"
        label="Gender"
        name="gender"
        options={genderOptions}
        component={FormFieldSelect}
        required
      />
      <Field
        id="patient-dob"
        label="Date Of Birth"
        name="dateOfBirth"
        component={FormFieldDate}
        required
      />
      <Field
        id="patient-ssn"
        label="Social Security Number"
        placeholder="SSN"
        name="ssn"
        component={FormFieldText}
        required
      />
      <Field
        id="patient-occupation"
        label="Occupation"
        placeholder="Occupation"
        name="occupation"
        component={FormFieldText}
        required
      />
    </>
  );
};

export default PatientFormBase;
