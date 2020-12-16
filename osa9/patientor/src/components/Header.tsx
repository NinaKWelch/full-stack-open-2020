import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Header: React.FC = () => (
  <Toolbar disableGutters style={{ marginBottom: 35 }}>
    <Typography
      variant="h5"
      component="h1"
      color="primary"
      style={{ flexGrow: 1 }}
    >
      Patientor
    </Typography>
    <Button component={RouterLink} to="/" color="primary">
      Home
    </Button>
  </Toolbar>
);

export default Header;
