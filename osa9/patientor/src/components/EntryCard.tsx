import React, { ReactChild, ReactChildren } from "react";
import { getDate } from "../utils";
import { Diagnosis } from "../types";
import EntryDiagnosis from "./EntryDiagnosis";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import LocalHospital from "@material-ui/icons/LocalHospital";
import HomeRepairService from "@material-ui/icons/HomeRepairService";
import Poll from "@material-ui/icons/Poll";
import { red, orange, green } from "@material-ui/core/colors";

interface Props {
  type: string;
  date: string;
  description: string;
  codes?: Array<Diagnosis["code"]>;
  children?: ReactChild | ReactChildren;
}

const EntryCard: React.FC<Props> = ({
  type,
  date,
  description,
  codes,
  children,
}) => {
  const getAvatar = (param: string) => {
    switch (param) {
      case "Occupational Healthcare":
        return (
          <Avatar style={{ backgroundColor: orange[700] }}>
            <HomeRepairService />
          </Avatar>
        );
      case "Health Check":
        return (
          <Avatar style={{ backgroundColor: green[700] }}>
            <Poll />
          </Avatar>
        );
      default:
        return (
          <Avatar style={{ backgroundColor: red[700] }}>
            <LocalHospital />
          </Avatar>
        );
    }
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader
          avatar={getAvatar(type)}
          title={type}
          subheader={getDate(date)}
        />
        <CardContent>
          {codes && codes.length > 0 ? <EntryDiagnosis codes={codes} /> : null}
          <Typography
            color="textSecondary"
            component="p"
            style={{ marginBottom: 15 }}
          >
            {description}
          </Typography>
          {children && (
            <>
              <Divider variant="fullWidth" />
              <div style={{ marginTop: 15 }}>{children}</div>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EntryCard;
