import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { NavLink, Switch, Route } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Footer from "../components/Footer";
// import {Switch} from "react-router-dom";

const AdminDashboard = React.lazy(() =>
  import("../components/Admin/AdminDashboard")
);
const AdminProduct = React.lazy(() =>
  import("../components/Admin/AdminProduct")
);
const AdminCreateProduct = React.lazy(() =>
  import("../components/Admin/AdminCreateProduct")
);
const AdminUpdateProduct = React.lazy(() =>
  import("../components/Admin/AdminUpdateProduct")
);
const AdminPromotion = React.lazy(() =>
  import("../components/Admin/AdminPromotion")
);
const AdminCreatePromotion = React.lazy(() =>
  import("../components/Admin/AdminCreatePromotion")
);
const AdminUpdatePromotion = React.lazy(() =>
  import("../components/Admin/AdminUpdatePromotion")
);
const AdminCreateUser = React.lazy(()=>import('../components/Admin/AdminCreateUser'))
const AdminOrder = React.lazy(()=>import('../components/Admin/AdminOrder'))
const AdminOrderDetail = React.lazy(()=>import('../components/Admin/AdminOrderDetail'))


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 5,
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: 0,
    height: "100vh",
    position: "fixed",
  },
  navbar: {
    backgroundColor: "#202C39",
    padding: theme.spacing(2),
    borderRadius: 0,
    height: "calc(180vh - 0.65em)",
  },
}));

const Admin = () => {
  const classes = useStyles();
  return (
      <React.Fragment>
    <div className={classes.root}>
      <Grid container spacing={3} justify="space-between">
        <Grid item xs={2} className={classes.navbar}>
          <Grid container spacing={2} justify="space-between">
            <Grid item xs={12}>
              <h3 style={{color:'#F29559', textAlign:'center'}}>Admin Dashboard</h3>
              <hr/>
              <Button
                  style={{width:"100%", borderRadius:0, color:'#F2D492'}}
                  component={NavLink}
                  activeStyle={{ backgroundColor: "#F2D492", color: "#202C39" }}
                  to="/admin"
                  exact
              >
                Dashboard
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                  style={{width:"100%", borderRadius:0, color:'#F2D492'}}
                  component={NavLink}
                  activeStyle={{ backgroundColor: "#F2D492", color: "#202C39" }}
                  to="/admin/products"
              >
                Products
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                  style={{width:"100%", borderRadius:0, color:'#F2D492'}}
                  component={NavLink}
                  activeStyle={{ backgroundColor: "#F2D492", color: "#202C39" }}
                  to="/admin/promotions"
              >
                Promotions
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                  style={{width:"100%", borderRadius:0, color:'#F2D492'}}
                  component={NavLink}
                  activeStyle={{ backgroundColor: "#F2D492", color: "#202C39" }}
                  to="/admin/orders"
              >
                Orders
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                  style={{width:"100%", borderRadius:0, color:'#F2D492'}}
                  component={NavLink}
                  activeStyle={{ backgroundColor: "#F2D492", color: "#202C39" }}
                  to="/admin/create/user"
              >
                Add User
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Switch>
            <Route exact path="/admin">
              <AdminDashboard style={{ padding: 10 }} />
            </Route>
            <Route exact path="/admin/products">
              <AdminProduct style={{ padding: 10 }} />
            </Route>
            <Route exact path="/admin/product/create">
              <AdminCreateProduct style={{ padding: 10 }} />
            </Route>
            <Route exact path="/admin/product/:_id">
              <AdminUpdateProduct style={{ padding: 10 }} />
            </Route>
            <Route exact path="/admin/promotions">
              <AdminPromotion style={{ padding: 10 }} />
            </Route>
            <Route exact path="/admin/promotion/create">
              <AdminCreatePromotion style={{ padding: 10 }} />
            </Route>
            <Route exact path="/admin/promotion/:_id">
              <AdminUpdatePromotion style={{ padding: 10 }} />
            </Route>
            <Route exact path="/admin/create/user">
              <AdminCreateUser style={{ padding: 10 }} />
            </Route>
            <Route exact path="/admin/orders">
              <AdminOrder style={{ padding: 10 }} />
            </Route>
            <Route exact path="/admin/order/:_id">
              <AdminOrderDetail style={{ padding: 10 }} />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </div>
        {/*Footer*/}
        <Footer />
      </React.Fragment>

  );
};
export default Admin;
