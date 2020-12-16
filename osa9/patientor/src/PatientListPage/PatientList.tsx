import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Patient } from "../types";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";

import HealthRatingBar from "../components/HealthRatingBar";

const PatientList: React.FC<{ patients: Patient[] }> = ({ patients }) => (
  <TableContainer component={Paper} style={{ marginTop: 35 }}>
    <Table size="small" aria-label="patient table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Gender</TableCell>
          <TableCell align="right">Occupation</TableCell>
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
            <TableCell align="right">{patient.gender}</TableCell>
            <TableCell align="right">{patient.occupation}</TableCell>
            <TableCell align="right">
              <HealthRatingBar rating={1} showText={false} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default PatientList;
