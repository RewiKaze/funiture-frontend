import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Fragment, Suspense } from "react";
import Navbar from "../src/components/NavBar";
import Footer from "../src/components/Footer";

const HomePage = React.lazy(() => import("./pages/Home"));
const ShopsPage = React.lazy(() => import("./pages/Shops"));
const PromotionPage = React.lazy(() => import("./pages/Promotion"));
const CartPage = React.lazy(() => import("./pages/Cart"));
const LoginPage = React.lazy(() => import("./pages/Login"));
const RegisterPage = React.lazy(() => import("./pages/Register"));
const AdminPage = React.lazy(() => import("./pages/Admin"));
const ProductSlug = React.lazy(() => import("./pages/ProductSlug"));
const UserPage = React.lazy(() => import("./components/User/User-Component"));
const CheckoutPage = React.lazy(() => import("./pages/Checkout"));
const PaymentPage = React.lazy(() => import("./pages/Payment"));

const App = () => {
  return (
    <Fragment>
      <Suspense fallback="Loading ...">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <HomePage />
              <Footer />
            </Route>
            <Route exact path="/products">
              <ShopsPage />
              <Footer />
            </Route>
            <Route  path="/product/:slug">
              <ProductSlug />
              <Footer />
            </Route>
            <Route  path="/promotions">
              <PromotionPage />
              <Footer />
            </Route>
            <Route  path="/customer">
              <UserPage />
              <Footer />
            </Route>
            <Route  path="/cart">
              <CartPage />
              <Footer />
            </Route>
            <Route  path="/checkout">
              <CheckoutPage />
            </Route>
            <Route  path="/payment">
              <PaymentPage />
            </Route>
            <Route  path="/login">
              <LoginPage />
            </Route>
            <Route  path="/register">
              <RegisterPage />
            </Route>
            <Route  path="/admin">
              <AdminPage />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </Fragment>
  );
};

export default App;
