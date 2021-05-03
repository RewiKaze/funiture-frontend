import { Typography, Button } from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import { makeStyles } from "@material-ui/core/styles";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import * as React from "react";
// import TextField from "@material-ui/core/TextField";
// import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import "../css/Payment.css";
import { useHistory } from "react-router";
import { useSession } from "../contexts/SessionContext";
import { useQuery } from "@apollo/client";
import { PRODUCT_QUERY } from "../graphql/productQuery";
const useStyles = makeStyles((theme) => ({
  button: {
    color: "#f29559",
    border: "1px solid #f29559",
  },
  IconC: {
    marginTop: 1,
    fontSize: "100%",
  },
  IconEd: {
    marginTop: 1,
    color: "#202C39",
  },
  rootZ: {
    "& > *": {
      margin: theme.spacing(1),
      width: "70vw",
    },
  },
}));
// const currencies = [
//   {
//     value: "BBL",
//     label: "BANGKOK BANK PUBLIC COMPANY LIMITED",
//   },
//   {
//     value: "KBANK",
//     label: "Kasikornbank Public Company Limited (KBANK)",
//   },
//   {
//     value: "SCB",
//     label: "Siam Commercial Bank Public Company Limited (SCB)",
//   },
//   {
//     value: "KTB",
//     label: "Krung Thai Bank Public Company Limited (KTB)",
//   },
// ];
const Payment = () => {
  const history = useHistory();
  const classes = useStyles();
  const { loading, error, data } = useQuery(PRODUCT_QUERY);
  // const [currency, setCurrency] = React.useState("SCB");
  const { cart, clearCart } = useSession();
  const [open, setOpen] = React.useState(false);
  if (loading) {
    return "Loading ...";
  }
  if (error) {
    return "Error !!";
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearCart();
    history.push("/");
  };

  // const handleChange = (event) => {
  //   setCurrency(event.target.value);
  // };
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
          Payment
          <PaymentIcon className={classes.IconC} />
        </Typography>
      </div>
      <div className="footerAllCheck">
        <div className="footerPayment">
          <div className="Total-S">Total Payment </div>
        </div>
        <div className="footerPayment">
          <div className="Total-S">
            {parseInt(
              rows.reduce((total, obj) => obj.total + total, 0)
            ).toLocaleString("th-TH", {
              style: "currency",
              currency: "THB",
            }) ?? ""}
          </div>
        </div>
      </div>
      <div className="HeaderDetail">
        <div className="Iconpay">
          <AccountBalanceIcon className="IconC" />
        </div>
        <div className="NamePays">Payment Method</div>
      </div>
      <div className="footerAllD">
        <div className="AddressD">
          <div className="Pay-Des">
            <span>Account : FUNITURE STORE INC. CO.,LTD </span>
            <br />
            <span className="Pay-Des2">
              Siam Commercial Bank Public Company Limited (SCB)
            </span>
            <span className="Pay-Des3">467 8514 258</span>
          </div>
        </div>
      </div>
      <div className="lineCross"></div>
      <div className="footerAllD">
        <div className="AddressD">
          <div className="Pay-Des">
            <span>Account : FUNITURE STORE INC. CO.,LTD </span>
            <br />
            <span className="Pay-Des2">
              Siam Commercial Bank Public Company Limited (SCB)
            </span>
            <span className="Pay-Des3">467 8514 258</span>
          </div>
        </div>
      </div>
      <div className="HeaderDetail">
        <div className="Iconpay">
          <CheckCircleIcon className="IconC" />
        </div>
        <div className="NamePays">Confirm payment</div>
      </div>
      <div className="footerPayment-F">
        <div className="AddressD">
          <div className="Pay-Des">
            <span>FACEBOOK OFFICIAL </span>
            <br />
            <span className="Pay-Des3">@funiture</span>
            <br />
            <span>Email </span>
            <br />
            <span className="Pay-Des3">admin@funiture.com</span>
          </div>
        </div>

        <div className="Payment-B">
          <div className="Payment-button">
            <Button
              onClick={handleClickOpen}
              variant="contained"
              disableElevation
              style={{ color: "white", backgroundColor: "#F29559" }}
            >
              SUBMIT
            </Button>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"THANK YOU"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <VerifiedUserIcon className="IconC" />
                We will confirm your order around 24 Hours or 7 - 14 days.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="#F29559">
                CLOSE
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Payment;
