import React, { useMemo } from "react";
import { NavLink, } from "react-router-dom";
import { AppBar, Toolbar, Button, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import logo from "../image/logo.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useSession } from "../contexts/SessionContext";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  styleBar: {
    backgroundColor: "#202c39",
  },
  button: {
    color: "#f29559",
    borderRadius: "0px",
  },
  navLinkRight: {
    right: theme.spacing(2),
    position: "absolute",
  },
}));

const NavBar = () => {
  const { loading, user, logout: handleLogout, cart } = useSession();
  const userBox = useMemo(() => {
    if (loading) {
      return <span>Loading ...</span>;
    }
    if (user) {
      return (
        <React.Fragment>
          {user?.type === "ADMIN" ? (
            <Button
              style={{ color: "#F29559" }}
              component={NavLink}
              type="button"
              activeStyle={{ borderBottom: "5px solid #f29559" }}
              to="/admin"
            >
              Admin
            </Button>
          ) : (
            <Button
              style={{ color: "#F29559" }}
              component={NavLink}
              activeStyle={{ borderBottom: "5px solid #f29559" }}
              to="/cart"
          >
            <Badge badgeContent={cart ? cart.reduce((total, obj) => obj.amount + total, 0): null} color="error">
              <ShoppingCartIcon />
            </Badge>
            {/*Cart*/}
          </Button>)
          }

          <Button component={NavLink}
              to="/customer">
            <Avatar style={{backgroundColor:"#F2D492"}}>{user?.name[0]}</Avatar>{'  '}
            <span style={{color:"#F29559", marginLeft:10}}>Hello,K.{user?.name}</span>
          </Button>

          <Button
            style={{ color: "#F29559" }}
            onClick={handleLogout}
            type="button"
          >
            <ExitToAppIcon /> Logout
          </Button>
        </React.Fragment>
      );
    }
    return (
      <Button
        component={NavLink}
        style={{ color: "#F29559" }}
        activeStyle={{ borderBottom: "5px solid #f29559" }}
        to="/login"
      >
        <PersonIcon /> Login
      </Button>
    );
  }, [handleLogout, loading, user]);

  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.styleBar}>
        <Toolbar>
          <div>
            <Button className={classes.button} component={NavLink} to="/" exact>
              <img src={logo} alt={"test"} width="50vw" />
            </Button>
            <Button
              className={classes.button}
              component={NavLink}
              activeStyle={{ borderBottom: "5px solid #f29559" }}
              to="/"
              exact
            >
              Home
            </Button>
            <Button
              className={classes.button}
              component={NavLink}
              activeStyle={{ borderBottom: "5px solid #f29559" }}
              to="/products"
            >
              Product
            </Button>
            <Button
              className={classes.button}
              component={NavLink}
              activeStyle={{ borderBottom: "5px solid #f29559" }}
              to="/promotions"
            >
              Promotion
            </Button>
          </div>

          <div className={classes.navLinkRight}>{userBox}</div>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );

};

export default NavBar;
