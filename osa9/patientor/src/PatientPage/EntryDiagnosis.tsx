import React, { useEffect, useState } from "react";

import { useStateValue } from "../state";
import { Diagnosis } from "../types";

const EntryDiagnosis: React.FC<{ codes: Array<Diagnosis["code"]> }> = ({
  codes,
}) => {
  const [{ diagnoses }] = useStateValue();
  const [patientDiagnosis, setPatientDiagnosis] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const diagnosisData = Object.values(diagnoses).filter((diagnosis) =>
      codes.includes(diagnosis.code)
    );

    setPatientDiagnosis(diagnosisData);
  }, []);

  return (
    <ul>
      {patientDiagnosis.map((diagnosis) => (
        <li key={diagnosis.code}>
          {diagnosis.code} {diagnosis.name}
        </li>
      ))}
    </ul>
  );
};

export default EntryDiagnosis;
