import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useMutation, useQuery} from "@apollo/client";
import {PROMOTION_QUERY} from "../../../graphql/promotionQuery";
import {DELETE_PROMOTION_MUTATION} from "../../../graphql/deletePromotion";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {Link} from "react-router-dom";


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

const PromotionItem = () =>  {
    const classes = useStyles();
    const { loading, error, data } = useQuery(PROMOTION_QUERY, { fetchPolicy: 'network-only' })
    const [deletePromotion] = useMutation(DELETE_PROMOTION_MUTATION)
    const removePromotion = async (id) =>{
        try{
            await deletePromotion({variables:{id}, refetchQueries: [{ query: PROMOTION_QUERY }]})
            alert("Delete Promotion Success")
        }catch (err){
            console.log(err)
            alert("Delete Promotion Failed")
        }
    }
    if (loading) {
        return 'Loading ...'
    }
    if (error) {
        return 'Error !!'
    }

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
                                Available: {promo.amount}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Link to={{
                            pathname: `/admin/promotion/${promo._id}`,
                        }} style={{ textDecoration: "none" }}>
                            <Button size="small" color="primary" variant="contained">
                                <EditIcon fontSize="small"/>Edit
                            </Button>
                        </Link>
                        <Button size="small" variant="outlined" style={{color:"red"}} onClick={() => removePromotion(promo._id)}>
                            <DeleteIcon fontSize="small"/>Delete
                        </Button>
                    </CardActions>
                </Card> :null}

            </Grid>
    )));
};
export default PromotionItem;
