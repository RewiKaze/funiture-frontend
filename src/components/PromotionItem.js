import React from 'react'
import {Card, Button, Grid, CardActionArea, CardMedia, CardContent, Typography, CardActions} from '@material-ui/core';
// Query Data
import {PROMOTION_QUERY} from "../graphql/promotionQuery";
import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/core/styles';
import {useSession} from "../contexts/SessionContext";

const useStyles = makeStyles((theme)=>({
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
}));

const PromotionItem = () => {
    const classes = useStyles();
    const { addProductToCart} = useSession();
    const { loading, error, data } = useQuery(PROMOTION_QUERY, { fetchPolicy: 'network-only' })
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
        data?.promotions?.map((promo) => (
            <Grid item xs={3}>
                {promo.product._id ?<Card className={classes.root2}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={promo.product.imageUrl}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h3" noWrap={true}>
                                {promo.name}
                            </Typography>
                            <Typography style={{color:'#f29559', fontSize:19}}>
                                {(parseInt(promo.total)).toLocaleString('th-TH', {
                                    style: 'currency',
                                    currency: 'THB'
                                }) ?? ""}{"     "}
                                <span style={{fontSize:14, color:"black", textDecoration:'line-through'}}>{(parseInt(promo.product.price)).toLocaleString('th-TH', {
                                    style: 'currency',
                                    currency: 'THB'
                                }) ?? ""}</span>
                            </Typography>
                            <Typography variant="body2" component="p" noWrap={true}>
                                Product: {promo.product.name}
                            </Typography>
                            <Typography variant="body2" component="p" noWrap={true} style={{color:"green"}}>
                                <b>Available: {promo.amount}</b>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small"  variant="contained" onClick={() => {
                            handleAddCart(promo.product._id);
                        }}
                                style={{backgroundColor:"#f29559", borderRadius:0, color:'white'}}>
                            Add to cart
                        </Button>
                    </CardActions>
                </Card> :null}
            </Grid>

        ))
    )
};
export default PromotionItem;
