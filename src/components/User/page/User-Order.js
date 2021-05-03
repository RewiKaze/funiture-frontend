import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useQuery } from "@apollo/client";
import { ORDER_QUERY } from "../../../graphql/orderQuery";
import { useSession } from "../../../contexts/SessionContext";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

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

const Order = () => {
    const classes = useStyles();
    const { user } = useSession();
    const OrderData = () => {
        const { loading, error, data } = useQuery(ORDER_QUERY, { fetchPolicy: 'network-only' })
        if (loading) {
            return 'Loading ...'
        }
        if (error) {
            return 'Error !!'
        }
        if (user) {
            return (
                data?.orders?.map((order) => (

                        <tr>
                            <td>{order.user._id === user._id ? order._id : ""}</td>
                            <td>{order.user._id === user._id ? order.user._id === user._id && order.status === "INCOMPLETE" ? <b style={{ color: 'lightsalmon' }}>INCOMPLETE</b>
                                : order.status === "CANCEL" ? <b style={{ color: 'red' }}>CANCELED</b>
                                    : <b style={{ color: 'lightgreen' }}>COMPLETED</b> : ""}</td>
                            <td>{order.user._id === user._id ? order.timestamp : ""}</td>
                            <td>{order.user._id === user._id ?
                                <Link
                                    to={{
                                        pathname: `/customer/order/${order._id}`,
                                    }}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button variant="contained">View</Button>
                                </Link>
                                : ""}
                            </td>
                            {/*:null}*/}
                        </tr>

                ))
            )
        }
    }

    return (

        <Grid item xs={9}>
            <Paper className={classes.paper}>
                <span style={{ fontWeight: '700', color: '#202C39' }}>My Order</span>
                <hr />
                <table style={{ width: '100%', textAlign: 'left', borderSpacing: "5px" }}>
                    <tr>
                        <th>Order ID</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>View Detail</th>
                    </tr>
                    {OrderData()}
                </table>
            </Paper>
        </Grid>

    );
}
export default Order;