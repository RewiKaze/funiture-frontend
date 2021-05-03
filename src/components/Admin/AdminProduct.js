import React from "react";
import {
  Grid,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CardItem from "./Adminproduct/showProduct";
import { NavLink } from "react-router-dom";

const AdminProduct = () => {
  return (
    <React.Fragment>
      <h1 style={{ color: "#202C39" }}>
        PRODUCT{" "}
        <span>
          <Button
            component={NavLink}
            to="/admin/product/create"
            variant="contained"
            style={{ backgroundColor: "#F2DC92" }}
          >
            <AddIcon /> Create Product
          </Button>
        </span>
      </h1>
      <hr />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <CardItem />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AdminProduct;
