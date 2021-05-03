import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Button} from '@material-ui/core';
import {useQuery} from "@apollo/client";
import {PROMOTION_QUERY} from "../../../graphql/promotionQuery";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper1: {
        padding: theme.spacing(2),
        backgroundColor:"#202C39"
    },
    root: {
        maxWidth: 345,
    },
}));
const PromotionList = () => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(PROMOTION_QUERY, { fetchPolicy: 'network-only' })
    if (loading) {
        return 'Loading ...'
    }
    if (error) {
        return 'Error !!'
    }

    const promotionItem = () => {
        return(data?.promotions?.map((promo) => (
            <tr style={{textAlign:"left" , color:"white"}}>
                <td>{promo.name}</td>
                <td>{promo.product.name}</td>
                <td>{promo.amount > 0 ? <b style={{color:'lightgreen'}}>In Stock ({promo.amount}) </b>: <b style={{color:'red'}}>Out Stock </b>}</td>
                <td>{promo.discount}%</td>
                <td>{(parseInt(promo.total)).toLocaleString('th-TH', {
                    style: 'currency',
                    currency: 'THB'
                }) ?? ""}</td>
            </tr>
        )))
    }
    return (
        <Paper className={classes.paper1} style={{color:'#F29559'}}>
            <h3 style={{color:'white'}}>
                Promotions List{'   '}
                <span>
                            <Link to={{
                                pathname: `/admin/promotions/`,
                            }} style={{ textDecoration: "none" }}>
                            <Button style={{backgroundColor:"#F29559", borderRadius:0}} size="small" variant="outlined">
                                See more
                            </Button>
                                </Link>
                        </span>
            </h3>
            <hr/>

            <table style={{width:'100%', textAlign:'left', borderSpacing:"5px"}}>
                <tr>
                    <th>Promotion</th>
                    <th>Product</th>
                    <th>Status</th>
                    <th>Discount</th>
                    <th>Price (Discount)</th>
                </tr>
                {promotionItem()}
            </table>

        </Paper>
    );
};

export default PromotionList;
