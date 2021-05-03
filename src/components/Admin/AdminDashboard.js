import React from 'react';
import {Grid } from '@material-ui/core';
import InStock from "./Dashboard/inStock";
import OrderList from "./Dashboard/orderList";
import PromotionList from "./Dashboard/promotionList";
const AdminDashboard = () =>{
    return(
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={7}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                            <InStock/>
                            </Grid>
                        </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <PromotionList/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <OrderList/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
export default AdminDashboard

