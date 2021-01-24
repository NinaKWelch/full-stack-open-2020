import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Patient } from "../types";
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

const PatientList: React.FC<{ patients: Patient[] }> = ({ patients }) => (
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
              {typeof patient.healthRating === "number" ? (
                <HealthRatingBar
                  rating={patient.healthRating}
                  showText={false}
                />
              ) : (
                patient.healthRating
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default PatientList;
