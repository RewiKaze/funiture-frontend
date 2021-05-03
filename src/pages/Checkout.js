import { Typography, Button } from "@material-ui/core";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import { NavLink } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { PRODUCT_QUERY } from "../graphql/productQuery";
import { useQuery } from "@apollo/client";
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import EmailIcon from '@material-ui/icons/Email';

import "../css/Checkout.css";

const Checkout = () => {
  const { user,cart } = useSession();
  const { loading, error, data } = useQuery(PRODUCT_QUERY);

  if (loading) {
    return "Loading ...";
  }
  if (error) {
    return "Error !!";
  }
  const columns = [
    { field: "id", headerName: "All", width: 880 },
    { field: "price", headerName: "Unit Price", width: 200 },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 220,
    },
    {
      field: "total",
      headerName: "Total Price",
      width: 220,
    },
  ];
  const rows = cart.map((each) => {
    const eachData = data?.products.find((o) => o._id === each.id);
    return {
      id: eachData.name,
      price: eachData.price,
      quantity: each.amount,
      total: each.amount * eachData.price,
    };
  });

  return (
    <div className="CartPage">
      <div className="HeaderCart">
        <Typography variant="h3" style={{ color: "#F29559" }}>
          Checkout
          </Typography>
          <Typography variant="h3" style={{ color: "#F29559"}}>
          <BeenhereIcon className="IconC" style={{ paddingTop: "40%", marginLeft : "15%" }}/>
          </Typography>
      </div>
      <div className="footerAllCheck">
        <div className="footerCheck">
          <div className="Deli-t" style={{fontWeight: "Bold"}}><HomeWorkIcon className="IconC"/> Delivery Address </div>
        </div>
      </div>
      <div className="HeaderDetail">
        <div className="NameAdds" style={{fontWeight: "600", paddingLeft: "2%"}}>
                Address
        </div>
      </div>
      <div className="footerAllD">
        <div className="AddressD">
          <div className="Add-Des">
            <span style={{ color: "#F29559",fontWeight: "Bold"}}><AccountCircleIcon className="IconC"/> K.{user.name}</span>
            <br />
            <span style={{ color: "#F29559",fontWeight: "400"}}><HomeIcon className="IconC"/> {user.address}</span>
            <br />
            <span style={{ color: "#F29559",fontWeight: "400"}}><PhoneIcon className="IconC"/> {user.tel}</span>
            <br />
            <span style={{ color: "#F29559",fontWeight: "400"}}><EmailIcon className="IconC"/> {user.email}</span>
          </div>
        </div>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
      <div className="footerAll">
        <div className="footerR">
          <div className="FeeText2">
            Order total : (
            <span>{cart.reduce((total, obj) => obj.amount + total, 0)}</span>{" "}
            items) :{" "}
          </div>
          <div className="Totalp">{(parseInt(rows.reduce((total, obj) => obj.total + total, 0))).toLocaleString('th-TH', {
            style: 'currency',
            currency: 'THB'
          }) ?? ""}</div>
          <div className="Payment-button">
            <Button
              component={NavLink}
              variant="contained"
              disableElevation
              to="/payment"
              style={{ color: "white", backgroundColor: "#F29559" }}
            >
              Payment
            </Button>
          </div>
        </div>
      </div>
      <div className="footerSection"></div>

    </div>
  );
};


export default Checkout;
