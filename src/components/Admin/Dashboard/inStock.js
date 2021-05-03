import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid, Button} from '@material-ui/core';
// Query Data
import { PRODUCT_QUERY } from "../../../graphql/productQuery";
import {useQuery} from "@apollo/client";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root1: {
        width: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paper1: {
        padding: theme.spacing(2),
        backgroundColor:"#202C39"
    },
}));

const ProductData = () => {
    const {loading, error, data} = useQuery(PRODUCT_QUERY, { fetchPolicy: 'network-only' })
    if (loading) {
        return 'Loading ...'
    }
    if (error) {
        return 'Error !!'
    }
    return (
        data?.products?.map((product) => (
            <tr style={{textAlign:"left" , color:"white"}}>
                <td>{product.name}</td>
                <td>{product.type}</td>
                <td>{(parseInt(product.price)).toLocaleString('th-TH', {
                    style: 'currency',
                    currency: 'THB'
                }) ?? ""} </td>
                <td>{product.quantity > 0 ? <b style={{color:'lightgreen'}}>In Stock ({product.quantity}) </b>: <b style={{color:'red'}}>Out of Stock </b>}</td>
                <td>{product.timestamp}</td>
            </tr>
        ))
    )
}
const InStock = () => {
    const classes = useStyles();


    return(

        <Paper className={classes.paper1} style={{color:'#F29559'}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h3 style={{color:'white'}}>Product List<span>
                                <Link to={{
                                    pathname: `/admin/products`,
                                }} style={{ textDecoration: "none" }}>{'   '}
                                <Button style={{backgroundColor:"#F29559", borderRadius:0}} size="small" variant="contained">
                                    See more
                                </Button>
                                    </Link>
                            </span></h3>

                    <hr/>
                    <table style={{width:'100%', textAlign:'left', borderSpacing:"5px"}}>
                        <tr>
                            <th style={{width:100}}>Name</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Date Added</th>
                        </tr>
                            {ProductData()}
                    </table>

                </Grid>
            </Grid>
        </Paper>
);
};

export default InStock;
