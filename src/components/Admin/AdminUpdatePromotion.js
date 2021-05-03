import React, { useCallback, useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {Link, useParams} from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { PROMOTION_QUERY } from "../../graphql/promotionQuery";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { UPDATE_PROMOTION_MUTATION } from "../../graphql/updatePromotion";
import { useHistory } from "react-router";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#202C39",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const AdminUpdatePromotion = () => {
  const history = useHistory();
  const { _id } = useParams();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [productId, setProductId] = useState("");
  const [updatePromotion] = useMutation(UPDATE_PROMOTION_MUTATION);
  const { loading, data, error } = useQuery(PROMOTION_QUERY, {
    variables: { _id },
    fetchPolicy: "network-only",
  });
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

  const savePromotion = async (e) => {
    e.preventDefault();
    try {
      console.log(data.promotions.find((each) => each._id === _id)._id);
      await updatePromotion({
        variables: {
          id: data.promotions.find((each) => each._id === _id)._id ?? 0,
          record: {
            updatePromotion,
            name,
            amount,
            discount,
            productId,
          },
        },
      });
      setName("");
      setAmount("");
      setDiscount("");
      setProductId("");
      history.push("/admin/promotions");
      alert("Update Promotion Success!!!");
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      // alert(err);
      alert("Update Promotion Failed!!!");
    }
  };

  if (loading) {
    return "Loading ...";
  }
  if (error) {
    return "Error !!";
  }
  const filteredData = data.promotions.find((each) => each._id === _id);
  return (
    <React.Fragment>
      {console.log(filteredData)}
      {/*Dashboard*/}
      <h1 style={{ color: "#202C39" }}>
        EDIT PROMOTION (ID: {filteredData._id})
      </h1>
      <hr />
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <form onSubmit={savePromotion}>
            <Grid container spacing={3}>
              <Grid item xs={7}>
                <TextField
                  label="Promotion Name"
                  variant="outlined"
                  style={{ width: "100%" }}
                  type="text"
                  placeholder={filteredData.name}
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="Amount"
                  variant="outlined"
                  style={{ width: "100%" }}
                  type="number"
                  placeholder={filteredData.amount}
                  value={amount}
                  onChange={handleAmountChange}
                  required
                />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  label="Discount (Percent)"
                  variant="outlined"
                  style={{ width: "100%" }}
                  type="number"
                  placeholder={filteredData.discount}
                  value={discount}
                  onChange={handleDiscountChange}
                  required
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label="ProductID"
                  variant="outlined"
                  style={{ width: "100%" }}
                  placeholder={filteredData.productId}
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
              Update
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
        </Grid>
        <Grid item xs={4}>
          <h3>Promotion Details</h3>
          <hr />
          <p>Promo Name: {filteredData.name}</p>
          <p>Amount: {filteredData.amount}</p>
          <p>Discount(%): {filteredData.discount}</p>
          <p>Product ID: {filteredData.productId}</p>
        </Grid>
      </Grid>

      <br />
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Detail</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Product ID:
              </StyledTableCell>
              <StyledTableCell>{filteredData.product._id}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Product Name:
              </StyledTableCell>
              <StyledTableCell>{filteredData.product.name}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Product Type:
              </StyledTableCell>
              <StyledTableCell>{filteredData.product.type}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Product Price:
              </StyledTableCell>
              <StyledTableCell>
                {parseInt(filteredData.product.price).toLocaleString("th-TH", {
                  style: "currency",
                  currency: "THB",
                }) ?? ""}
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Product Image:
              </StyledTableCell>
              <StyledTableCell>
                <img src={filteredData.product.imageUrl} alt={filteredData.product.name}/>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Product Description:
              </StyledTableCell>
              <StyledTableCell>
                {filteredData.product.description}
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default AdminUpdatePromotion;
