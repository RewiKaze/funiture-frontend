import Paper from "@material-ui/core/Paper";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import { ORDER_QUERY} from "../../../graphql/orderQuery";
import {useQuery} from "@apollo/client";

const useStyles = makeStyles((theme) => ({
    paper1: {
        padding: theme.spacing(2),
        backgroundColor:"#202C39"
    },
}));
const OrderData = () => {
    const {loading, error, data} = useQuery(ORDER_QUERY, { fetchPolicy: 'network-only' })
    if (loading) {
        return 'Loading ...'
    }
    if (error) {
        return 'Error !!'
    }
    return (
        data?.orders?.map((order) => (
            <tr style={{textAlign:"left" , color:"white"}}>
                <td>{order._id}</td>
                <td>{order.status === "INCOMPLETE"?<b style={{color:'lightsalmon'}}>INCOMPLETE</b>
                    : order.status === "CANCEL"? <b style={{color:'red'}}>CANCELED</b>
                        : <b style={{color:'lightgreen'}}>COMPLETED</b>}</td>
            </tr>
        ))
    )
}

const OrderList = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper1} style={{color:'#F29559'}}>
            <h3 style={{color:'white'}}>Order List{'   '}
            <span>
                            <Link to={{
                                pathname: `/admin/orders`,
                            }} style={{ textDecoration: "none" }}>
                            <Button style={{backgroundColor:"#F29559", borderRadius:0}} size="small" variant="outlined">
                                See more
                            </Button>
                                </Link>
                        </span></h3>
            <hr/>
                <table style={{width:'100%', textAlign:'left', borderSpacing:"5px"}}>
                    <tr>
                        <th>Order ID</th>
                        <th>Status</th>
                    </tr>
                    {OrderData()}

                </table>
        </Paper>
);
};

export default OrderList;
