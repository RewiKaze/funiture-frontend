import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {ORDER_QUERY} from "../../../graphql/orderQuery";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: '2rem',
        height: '80vh',
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

// function getSteps() {
//     return ['Request order', 'Shipping Order', 'Success'];
// }

const OrderID = () => {
    const { _id } = useParams();
    const { loading, data, error } = useQuery(ORDER_QUERY, {
        variables: { _id },
        fetchPolicy: "network-only",
    });
    // const steps = getSteps();
    const classes = useStyles();
    if (loading) {
        return "Loading ...";
    }
    if (error) {
        return "Error !!";
    }

    const filteredData = data.orders.find((each) => each._id === _id);
    console.log(data)
    console.log(filteredData)
    return (
        <React.Fragment>
            {data ? (
        <Grid item xs={9}>
            <Paper className={classes.paper}>
                <div style={{ display: 'flex' }}>
                    <Grid item xs={1}>
                        <Link
                            to={{
                                pathname: `/customer/orders`,
                            }}
                            style={{ textDecoration: "none" }}
                        >
                            <Button>
                        <ArrowBackIosIcon style={{ color: '#202C39' }}></ArrowBackIosIcon>
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item xs={10}>
                        <span style={{ fontWeight: '700', color: '#202C39' }}>My Order: {filteredData._id}</span>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </div>
                <hr/>
                <div style={{ color: '#C4C4C4', textAlign: 'left', marginLeft: '1rem', fontSize: '0.75rem' }}><span>My Order /</span><span> Created on {filteredData.timestamp}</span></div>
                <div>
                    <div>
                        <div id="order1" style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem' }}>
                            <div style={{ display: 'flex', marginLeft: '1rem' }}>
                                <img src={filteredData.product.imageUrl} alt={"test"} style={{ width: '4rem' }} />
                                <div style={{ textAlign: 'left', marginLeft: '1rem' }}>
                                    <span style={{ fontWeight: '600', color: '#202C39' }}>{filteredData.product.name}</span><br></br>
                                    <span style={{ fontWeight: '600', color: '#202C39' }}>{filteredData.product.description}</span><br></br>
                                </div>
                            </div>
                            <span style={{ fontWeight: '600', color: '#202C39' }}>{parseInt(filteredData.product.price).toLocaleString("th-TH", {
                                style: "currency",
                                currency: "THB",
                            }) ?? ""}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem', marginLeft: '2rem' }}>
                            <span style={{ fontWeight: '600', color: '#202C39' }}>Status</span>
                            <span style={{ fontWeight: '600', color: '#202C39' }}>{filteredData.status === "INCOMPLETE"?<b style={{color:'lightsalmon'}}>INCOMPLETE</b>
                                : filteredData.status === "CANCEL"? <b style={{color:'red'}}>CANCELED</b>
                                    : <b style={{color:'green'}}>COMPLETED</b>}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem', marginLeft: '2rem' }}>
                            <span style={{ fontWeight: '600', color: '#202C39' }}>Shipping</span>
                            <span style={{ fontWeight: '600', color: '#202C39' }}>Free</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem', marginLeft: '2rem' }}>
                            <span style={{ fontWeight: '800', color: '#202C39' }}>Total</span>
                            <span style={{ fontWeight: '800', color: '#202C39' }}>{parseInt(filteredData.total).toLocaleString("th-TH", {
                                style: "currency",
                                currency: "THB",
                            }) ?? ""}</span>
                        </div>
                        <div style={{ display: 'flex', marginTop: '2.5rem', borderRadius: '0.5rem' }}>
                            <Grid item xs={4} style={{ backgroundColor: '#202C39', color: 'white', padding: '1rem' }}>
                                Payment Method
                                </Grid>
                            <Grid item xs={8} style={{ backgroundColor: '#E5E5E5', color: '#F29559', padding: '1rem' }}>
                                Transfer Banking
                                </Grid>
                        </div>
                    </div>
                </div>
            </Paper>
        </Grid>
            ) : (
                <React.Fragment></React.Fragment>
            )}
                </React.Fragment>
    )
}
export default OrderID;