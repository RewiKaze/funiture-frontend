import React from 'react'
import "../../css/Home.css"
import { Button, Grid} from '@material-ui/core';
// Query Data
import { PROMOTION_QUERY } from "../../graphql/promotionQuery";
import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles';
import {useSession} from "../../contexts/SessionContext";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
    },
    media: {
        height: 140,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    Button1: {
        color: "white",
        backgroundColor: "#F29559",
        border: "solid #F29559",
    },
}));

const PromotionItem = () => {
    const classes = useStyles();
    const { addProductToCart } = useSession();
    const { loading, error, data } = useQuery(PROMOTION_QUERY)
    if (loading) {
        return 'Loading ...'
    }
    if (error) {
        return 'Error !!'
    }

    const handleAddCart = (id) => {
        const result = {
            id: id,
            amount: 1,
        };
        addProductToCart(result);
    };
    return (
        data?.promotions?.slice(0, 4).map((promo) => (
            <Grid item xs={3}>
                {promo.product._id ?
                    // <Card className={classes.root2}>
                    <div className="best-sell">
                        <img className="best-sell-img" alt={"test"} src={promo.product.imageUrl} />
                        <div className="best-sell-content">
                            <span className="best-sell-name" noWrap={true}>{promo.product.name}</span>
                        </div>
                        <span className="best-sell-price">{(parseInt(promo.total)).toLocaleString('th-TH', {
                            style: 'currency',
                            currency: 'THB'
                        }) ?? ""}{"     "}
                            <span style={{ fontSize: 14, color: "black", textDecoration: 'line-through' }}>{(parseInt(promo.product.price)).toLocaleString('th-TH', {
                                style: 'currency',
                                currency: 'THB'
                            }) ?? ""}</span></span> <hr />
                        <div style={{ alignItems: 'center' }}>
                            {/*<Button size="small" color="primary">*/}
                            {/*    Detail*/}
                            {/*</Button>*/}
                            <Button class={classes.Button1} size="small" color="primary" variant="contained"
                                    onClick={() => {
                                        handleAddCart(promo.product._id);
                                    }}>
                                Add to cart
                            </Button>
                        </div>

                    </div> : null}
            </Grid>
        ))
    )
};
export default PromotionItem;
