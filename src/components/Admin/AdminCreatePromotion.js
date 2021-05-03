import React, { useCallback, useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";

import { PROMOTION_QUERY } from "../../graphql/promotionQuery";
//Mutation
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { PRODUCT_QUERY } from "../../graphql/productQuery";
const CREATE_PROMOTION = gql`
  mutation($record: CreateOnePromotionInput!) {
    createPromotion(record: $record) {
      recordId
    }
  }
`;

const ProductData = () => {
  const { loading, error, data } = useQuery(PRODUCT_QUERY);
  if (loading) {
    return "Loading ...";
  }
  if (error) {
    return "Error !!";
  }
  return data?.products?.map((product) => (
    <tr style={{ textAlign: "left" }}>
      <td>{product._id}</td>
      <td>{product.name}</td>
      <td>
        {product.quantity > 0 ? (
          <b style={{ color: "lightgreen" }}>In Stock ({product.quantity}) </b>
        ) : (
          <b style={{ color: "red" }}>Out Stock </b>
        )}
      </td>
    </tr>
  ));
};

const AdminCreatePromotion = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [productId, setProductId] = useState("");
  const [createPromotion] = useMutation(CREATE_PROMOTION);

  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);
  const handleAmountChange = useCallback((e) => {
    setAmount(e.target.value);
  }, []);
  const handleDiscountChange = useCallback((e) => {
    setDiscount(e.target.value);
  }, []);
  const handleProductIdChange = useCallback((e) => {
    setProductId(e.target.value);
  }, []);


  const handleCreatePromotion = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const variables = {
          record: { createPromotion, name, amount, discount, productId },
        };
        await createPromotion({
          variables,
          refetchQueries: [{ query: PROMOTION_QUERY }],
        });
        setName("");
        setAmount("");
        setDiscount("");
        setProductId("");
        history.push("/admin/promotions");
        alert("Add Promotion Success!!!");
      } catch (err) {
        console.log(err);
        alert("Add Promotion Failed!!!");
      }
    },
    [createPromotion, name, amount, discount, productId]
  );

  return (
    <React.Fragment>
      {/*Dashboard*/}
      <h1 style={{ color: "#202C39" }}>CREATE PROMOTION</h1>
      <hr />
      <form onSubmit={handleCreatePromotion}>
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <TextField
              label="Promotion Name"
              variant="outlined"
              style={{ width: "100%" }}
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Amount"
              variant="outlined"
              style={{ width: "100%" }}
              type="number"
              value={amount}
              onChange={handleAmountChange}
              required
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Discount (Percent)"
              variant="outlined"
              style={{ width: "100%" }}
              type="number"
              max={100}
              value={discount}
              onChange={handleDiscountChange}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="ProductID"
              variant="outlined"
              style={{ width: "100%" }}
              type="text"
              value={productId}
              onChange={handleProductIdChange}
              required
            />
          </Grid>
        </Grid>
        <hr />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          value="Submit"
        >
          Create
        </Button>
        {"  "}
        <Link
          to={{
            pathname: `/admin/promotions`,
          }}
          style={{ textDecoration: "none" }}
        >
          <Button variant="outlined" color="secondary">
            Back
          </Button>
        </Link>
      </form>
      <h2>Product List</h2>
      <hr />
      <table style={{ width: "100%", textAlign: "left", borderSpacing: "5px" }}>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Status</th>
        </tr>
        {ProductData()}
      </table>
    </React.Fragment>
  );
};

export default AdminCreatePromotion;
