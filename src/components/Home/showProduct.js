import React from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Query Data
import { PRODUCT_QUERY } from "../../graphql/productQuery";
import { useQuery } from '@apollo/client'
import {useSession} from "../../contexts/SessionContext";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    root2: {
        maxWidth: 345,
        borderRadius:0
    },
    media: {
        height: 140,

    },
}));


const CardItem = () => {
    const classes = useStyles();
    const { addProductToCart} = useSession();
    const { loading, error, data } = useQuery(PRODUCT_QUERY, { fetchPolicy: 'network-only' })

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
        data?.products?.slice(0, 8).map((product) => (
            <Grid item xs={3}>
                <Card className={classes.root2}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={product.imageUrl}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h3" noWrap={true}>
                                {product.name}
                            </Typography>
                            <Typography style={{color:'#f29559', fontSize:19}}>
                                {(parseInt(product.price)).toLocaleString('th-TH', {
                                    style: 'currency',
                                    currency: 'THB'
                                }) ?? ""}
                            </Typography>
                            <Typography variant="body2"  component="p" noWrap={true}>
                                {product.description}
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                    <CardActions>

                        <Button size="small"  variant="contained"
                                onClick={() => {
                                    handleAddCart(product._id);
                                }}
                                style={{backgroundColor:"#f29559", borderRadius:0, color:'white'}}
                        >
                            Add to cart
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        ))
    )
}
export default CardItem;
