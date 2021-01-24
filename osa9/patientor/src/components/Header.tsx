import React from "react";
import { Link as RouterLink } from "react-router-dom";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

const Header: React.FC = () => (
  <Toolbar disableGutters style={{ marginBottom: 35 }}>
    <Typography component="h1" variant="h5" style={{ flexGrow: 1 }}>
      <Link
        component={RouterLink}
        to="/"
        underline="none"
        color="primary"
        variant="inherit"
      >
        Patientor
      </Link>
    </Typography>
    <Button component={RouterLink} to="/" color="primary">
      Home
    </Button>
  </Toolbar>
);

export default Header;
