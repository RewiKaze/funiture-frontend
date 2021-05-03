import React from "react";
import "./../css/ProductSlug.css";
import { Grid } from "@material-ui/core";

import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { PRODUCT_QUERY } from "../graphql/productQuery";
import { useQuery } from "@apollo/client";
import { useParams, } from "react-router-dom";
import {useSession} from "../contexts/SessionContext";


const ProductSlug = (prop) => {
  const { addProductToCart, cart } = useSession();
  const { slug } = useParams();
  const { loading, data, error } = useQuery(PRODUCT_QUERY, {
    variables: { slug },
    fetchPolicy: "network-only",
  });
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

  const filteredData = data.products.find((each) => each.slug === slug);


  return (
    <React.Fragment>
      <div className="Product-sell">
        <Grid item xs={6}>
          <p className="head-name">{filteredData.name}</p>
          <hr></hr>
          <div style={{ display: "flex" }}>

            <div className="tag-product">{filteredData.type}</div>
          </div>
          <p className="price-product">
            {parseInt(filteredData.price).toLocaleString("th-TH", {
              style: "currency",
              currency: "THB",
            }) ?? ""}
          </p>
          <div style={{ display: "flex" }}>
            <span style={{ marginRight: "2rem" }}>Shipping</span>
            <div style={{ width: "50%" }}>
              <div style={{ display: "flex", alignContent: "center" }}>
                <LocalShippingIcon
                  style={{ color: "#F29559" }}
                ></LocalShippingIcon>
                <span style={{ color: "#9E9E9E" }}>
                  &nbsp;Standard delivery
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignContent: "center" }}>
                  <LocalAtmIcon style={{ color: "#F29559" }}></LocalAtmIcon>
                  <span style={{ color: "#9E9E9E" }}>&nbsp;Shipping Fee</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "3rem", display: "flex" }}>
            <Button
              className="Button1"
              style={{ width: "30%", marginRight: "1rem" }}
              onClick={() => {
                handleAddCart(filteredData._id);
              }}
            >
              <ShoppingCartIcon></ShoppingCartIcon>
              &nbsp;ADD to CART
            </Button>
          </div>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            marginLeft: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img src={filteredData.imageUrl} alt={filteredData.name} className="img-product" />
        </Grid>
      </div>

      {/* product detail */}
      <div className="Product-Detail">
        <span style={{ color: "#F29559", marginBottom: "1rem" }}>
          Product Specifications
        </span>
        <div className="Product-Speci">
          <div className="Detail-box">
            <Grid item xs={3} style={{ color: "#F29559" }}>
              <span>Catagory</span>
              <br></br>
              <span>Brand</span>
              <br></br>
              <span>Stock</span>
              <br></br>
            </Grid>
            <Grid item xs={8} style={{ color: "#202C39" }}>
              <span>{filteredData.type}</span>
              <br></br>
              <span>{filteredData.name}</span>
              <br></br>
              <span>{filteredData.quantity}</span>
              <br></br>
            </Grid>
          </div>
        </div>
        <span style={{ color: "#F29559", marginBottom: "1rem" }}>
          Product Description
        </span>
        <div className="Product-Speci">
          <div className="Detail-box">
            <span style={{ color: "#202C39" }}>{filteredData.description}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductSlug;
