import { Typography, Button} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSession } from "../contexts/SessionContext";
import { useEffect, useState } from "react";
import { PRODUCT_QUERY } from "../graphql/productQuery";
import { useQuery } from "@apollo/client";

import "../css/Cart.css";
const useStyles = makeStyles((theme) => ({
  button: {
    color: "#f29559",
    border: "1px solid #f29559",
  },
  IconC: {
    marginTop: 1,
  },
}));

const Cart = () => {
  const { cart } = useSession();
  const [rows, setRows] = useState([]);
  const { loading, error, data } = useQuery(PRODUCT_QUERY);
  const classes = useStyles();
  useEffect(() => {
    if (loading) {
      return "Loading ...";
    }
    if (error) {
      return "Error !!";
    }
    console.log(cart);
    if (cart) {
      const dataTemp = [];
      cart.forEach((each) => {
        const eachData = data?.products.find((o) => o._id === each.id);
        dataTemp.push({
          id: eachData.name,
          price: eachData.price,
          quantity: each.amount,
          total: each.amount * eachData.price,
        });
      });
      setRows(dataTemp);
    }
  }, [loading]);
  if (loading) {
    return "Loading ...";
  }
  if (error) {
    return "Error !!";
  }

  const columns = [
    { field: "id", headerName: "All", width: 880 },
    { field: "price", headerName: "Unit Price", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 220 },
    { field: "total", headerName: "total", width: 220 },
  ];

  return (
    <div className="CartPage">
      <div className="HeaderCart">
        <Typography
          variant="h3"
          style={{ color: "#F29559", marginLeft: "1%", marginTop: "1%" }}
        >
          Shopping Cart
        </Typography>
        <Typography variant="h3" style={{ color: "#F29559" }}>
          <ShoppingCartIcon
            className="IconC"
            style={{ paddingTop: "40%", marginLeft: "15%" }}
          />
        </Typography>
      </div>
      <div
        style={{
          height: 400,
          width: "100vw",
          border: "transparent !important",
        }}
      >
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
      <div className="footerAll">
        <div className="FeeText2">
          Total (
          <span>
            {rows.length > 0
              ? cart.reduce((total, obj) => obj.amount + total, 0)
              : 0}
          </span>{" "}
          items) :{" "}
        </div>
        <div className="Totalp">
          {parseInt(
            rows.reduce((total, obj) => obj.total + total, 0)
          ).toLocaleString("th-TH", {
            style: "currency",
            currency: "THB",
          }) ?? ""}
        </div>
        <div className="C-button">
          <Button
            component={NavLink}
            to="/checkout"
            variant="outlined"
            className={classes.button}
          >
            Check out
          </Button>
        </div>
      </div>
      <div className="footerSection"></div>
    </div>
  );
};

export default Cart;
