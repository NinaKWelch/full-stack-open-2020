import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Patient, Entry } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Hidden from "@material-ui/core/Hidden";

const PatientList: React.FC<{ patients: Patient[] }> = ({ patients }) => {
  const checkRating = (arr: Entry[]): string | React.ReactNode => {
    // check if health rating has been given
    const checks = arr.map((obj) =>
      obj.type === "HealthCheck" ? obj.healthCheckRating : null
    );
    // get the latest rating
    const lastCheck = checks.pop();

    if (typeof lastCheck === "number") {
      return <HealthRatingBar rating={lastCheck} showText={false} />;
    }

    return "Not given";
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: 35 }}>
      <Table aria-label="patient list">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <Hidden xsDown>
              <TableCell align="right">Gender</TableCell>
            </Hidden>
            <Hidden smDown>
              <TableCell align="right">Occupation</TableCell>
            </Hidden>
            <TableCell align="right">Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell component="th" scope="row">
                <Link component={RouterLink} to={`/patients/${patient.id}`}>
                  {patient.name}
                </Link>
              </TableCell>
              <Hidden xsDown>
                <TableCell align="right">{patient.gender}</TableCell>
              </Hidden>
              <Hidden smDown>
                <TableCell align="right">{patient.occupation}</TableCell>
              </Hidden>
              <TableCell align="right">
                {patient.entries && patient.entries.length > 0
                  ? checkRating(patient.entries)
                  : "Not given"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientList;
