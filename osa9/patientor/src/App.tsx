import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosisList } from "./state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    // axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );

        dispatch(setPatientList(patientListFromApi));
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (err) {
        console.error(err);
      }
    };

    void fetchPatientList();
    void fetchDiagnosisList();
  }, [dispatch]);

  return (
    <Router>
      <div>
        <h1>Patientor</h1>
        <Link to="/">Home</Link>
        <Switch>
          <Route path="/patients/:id">
            <PatientPage />
          </Route>

          <Route exact path="/">
            <PatientListPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
