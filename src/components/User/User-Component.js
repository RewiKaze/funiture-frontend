import { Route, Switch } from "react-router-dom";
import Home from "../../pages/Home";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import "./User-Component.css";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import { useSession } from "../../contexts/SessionContext";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const Account = React.lazy(() => import("./page/User-Account"));
const Address = React.lazy(() => import("./page/User-Address"));
const Order = React.lazy(() => import("./page/User-Order"));
const OrderID = React.lazy(() => import("./page/User-OrderID"));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "2rem",
    height: "80vh",
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const User = () => {
  const classes = useStyles();
  const { user} = useSession();
  if (user) {
    return (
      <React.Fragment>
        <div className={classes.root} style={{ display: "flex" }}>
          <Grid item xs={3}>
            <Paper
              className={classes.paper}
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#E5E5E5",
                boxShadow: "0 0",
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                  <Avatar style={{ backgroundColor: "#F2D492", width: '4.5rem', height: '4.5rem' }}>{user?.name[0]}</Avatar>{'  '}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: "1rem", textAlign: "left" }}>
                  <span className="head-title">{user?.name}</span>
                  <span style={{ color: '9E9E9E', fontSize: 'small' }}>ข้อมูลส่วนตัวของคุณ</span>
                </div>
              </div>
              <hr style={{ width: "80%", marginTop: '2rem', marginBottom: '1rem' }}></hr>
              <List>
                <ListItem button component={NavLink} to="/customer" style={{color:'#202C39'}} activeStyle={{ color:'#F29559' }} exact>
                  <ListItemIcon><PersonOutlineOutlinedIcon></PersonOutlineOutlinedIcon></ListItemIcon>
                  <ListItemText primary="My Account" />
                </ListItem>
                <ListItem button component={NavLink} to="/customer/orders" style={{color:'#202C39'}} activeStyle={{ color:'#F29559' }}>
                  <ListItemIcon><InsertDriveFileOutlinedIcon></InsertDriveFileOutlinedIcon></ListItemIcon>
                  <ListItemText primary="My Order" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Switch>
              <Route exact path="/customer">
                <Account />
              </Route>
              <Route path="/customer/address">
                <Address />
              </Route>
              <Route path="/customer/orders">
                <Order />
              </Route>
              <Route path="/customer/order/:_id">
                <OrderID />
              </Route>
            </Switch>
          </Grid>
        </div>
      </React.Fragment>
    );
  } else {
    return <Home />;
  }
};
export default User;
