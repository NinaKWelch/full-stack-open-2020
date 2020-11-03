import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    // axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );

        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (err) {
        console.error(err);
      }
    };

    void fetchPatientList();
  }, [dispatch]);

  return (
    <Router>
      <div>
        <h1>Patientor</h1>
        <Link to="/">Home</Link>
        <Switch>
          <Route path="/" render={() => <PatientListPage />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
