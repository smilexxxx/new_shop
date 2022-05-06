import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCartOutlined } from "@material-ui/icons";
import logo from "../../assets/Logo.jpg";
import useStyles from "./navbarStyles";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();

  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              component={Link}
              to="/"
              src={logo}
              alt="Shopzia"
              height="25px"
              className={classes.image}
            />
            Shopzia
          </Typography>

          <div className={classes.grow} />
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="show cart items"
                color="inherit"
              >
                <Badge badgeContent={totalItems} color="secondary"></Badge>
                <ShoppingCartOutlined />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
