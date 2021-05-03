import React from "react";
import {
    Grid,
} from "@material-ui/core";
import OrderItem from "./Adminorder/showOrder";

const AdminOrder = () => {
    return (
        <React.Fragment>
            {/*Dashboard*/}
            <h1 style={{ color: "#202C39" }}>
                ORDER{" "}
            </h1>
            <hr />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <OrderItem />
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default AdminOrder;
