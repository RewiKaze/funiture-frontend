import React from "react";
import { Grid, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PromotionItem from "./Adminpromotion/showPromotion";
import { NavLink } from "react-router-dom";
const AdminPromotion = () => {
  return (
    <React.Fragment>
      <h1 style={{ color: "#202C39" }}>
        PROMOTION{" "}
        <span>
          <Button
            component={NavLink}
            to="/admin/promotion/create"
            variant="contained"
            style={{ backgroundColor: "#F2DC92" }}
          >
            <AddIcon /> Create Promotion
          </Button>
        </span>
      </h1>
      <hr />
      <Grid container spacing={3}>
        <PromotionItem />
      </Grid>
    </React.Fragment>
  );
};

export default AdminPromotion;
