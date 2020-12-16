import React, { ReactChild, ReactChildren } from "react";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import LocalHospital from "@material-ui/icons/LocalHospital";
import HomeRepairService from "@material-ui/icons/HomeRepairService";
import Poll from "@material-ui/icons/Poll";
import { red, orange, green } from "@material-ui/core/colors";

interface Props {
  type: string;
  date: string;
  children: ReactChild | ReactChildren;
}

const EntryCard: React.FC<Props> = ({ type, date, children }) => {
  const getTitle = (param: string) => {
    switch (param) {
      case "OccupationalHealthcare":
        return "Occupational Healthcare";
      case "HealthCheck":
        return "Health Check";
      default:
        return "Hospital";
    }
  };

  const getAvatar = (param: string) => {
    switch (param) {
      case "OccupationalHealthcare":
        return (
          <Avatar style={{ backgroundColor: orange[700] }}>
            <HomeRepairService />
          </Avatar>
        );
      case "HealthCheck":
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
          title={getTitle(type)}
          subheader={date}
        />
        {children}
      </Card>
    </Grid>
  );
};

export default EntryCard;
