import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSession } from "../contexts/SessionContext";

// Query Data
import { PRODUCT_QUERY } from "../graphql/productQuery";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  root2: {
    maxWidth: 345,
    borderRadius: 0,
  },
  media: {
    height: 140,
  },
}));

const CardItem = (prop) => {
  const { addProductToCart, cart } = useSession();
  const classes = useStyles();
  const { loading, error, data } = useQuery(PRODUCT_QUERY, { fetchPolicy: 'network-only' });
  if (loading) {
    return "Loading ...";
  }
  if (error) {
    return "Error !!";
  }

  const handleAddCart = (id) => {
    console.log(id, cart);
    const result = {
      id: id,
      amount: 1,
    };
    addProductToCart(result);
  };

  return (
    <Grid item xs={3}>
      {console.log(prop.product)}
      <Card className={classes.root2}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={prop.product.imageUrl}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h3" noWrap={true}>
              {prop.product.name}
            </Typography>
            <Typography style={{ color: "#f29559", fontSize: 19 }}>
              {parseInt(prop.product.price).toLocaleString("th-TH", {
                style: "currency",
                currency: "THB",
              }) ?? ""}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              noWrap={true}
            >{prop.product.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {prop.product.quantity > 0 ? <b style={{color:'darkgreen'}}>In Stock ({prop.product.quantity}) </b>: <b style={{color:'red'}}>Out of Stock </b>}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link
            to={{
              pathname: `/product/${prop.product.slug}`,
            }}
            style={{ textDecoration: "none" }}
          >
            <Button size="small" color="primary">
              Detail
            </Button>
          </Link>
          <Button
            onClick={() => {
              handleAddCart(prop.product._id);
            }}
            size="small"
            style={{backgroundColor:"#f29559", borderRadius:0, color:'white'}}
            variant="contained"
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CardItem;
