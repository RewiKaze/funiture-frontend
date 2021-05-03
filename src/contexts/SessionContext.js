import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { useCookies } from "react-cookie";

import { ME_QUERY } from "../graphql/meQuery";
import { LOGIN_MUTATION } from "../graphql/loginMutation";
import { Redirect, useHistory } from "react-router";
const SessionContext = createContext();

export const SessionProvider = (props) => {
  const { children } = props;
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies([
    "token",
    "user",
    "cart",
  ]);
  const cart = cookie.cart;
  const token = cookie.token;
  const userData = cookie.user;
  const [loadMe, { loading, data }] = useLazyQuery(ME_QUERY, {
    fetchPolicy: "network-only",
  });
  const [login] = useMutation(LOGIN_MUTATION);
  const handleClearCart = () => {
    removeCookie("cart", { maxAge: 86400 });
    history.push("/");
  };
  const handleLogin = useCallback(
    async (username, password) => {
      try {
        const res = await login({ variables: { username, password } });
        if (res?.data?.login?.token) {
          setCookie("token", res?.data?.login?.token, {
            maxAge: 86400,
            path: "/",
          });
          setCookie("user", res?.data?.login?.user, {
            maxAge: 86400,
            path: "/",
          });
          setUser(res?.data?.login?.user);
          console.log(res?.data?.login?.user);
          history.push("/");
        }
      } catch (err) {
        removeCookie("token", { maxAge: 86400 });
        removeCookie("user", { maxAge: 86400 });
        throw new Error(`username or password is not correct!`);
      }
    },
    [login, removeCookie, setCookie, history]
  );
  useEffect(() => {
    console.log(userData);
    if (userData) {
      setUser(userData);
    }
    return () => {};
  }, [cookie]);

  useEffect(() => {
    console.log(data?.user);
    if (data?.user) {
      setUser(data?.user);
    }
  }, [data]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const id = userData?._id ?? "0";
        const res = await loadMe();
        // await loadMe()
        console.log(data?.user);
        setUser(data?.user);
      } catch (err) {
        removeCookie("token", { maxAge: 86400 });
        removeCookie("user", { maxAge: 86400 });
      }
    };
    loadData();
  }, [loadMe, removeCookie]);

  const handleLogout = useCallback(() => {
    setUser(null);
    removeCookie("token", { maxAge: 86400 });
    removeCookie("user", { maxAge: 86400 });
    removeCookie("cart", { maxAge: 86400 });
    // history.push("/");
    window.location.href = "/";
  }, [user, removeCookie, history]);

  const handleAddCart = (product) => {
    console.log("CART", cart);
    if (cart === undefined) {
      console.log("FIRST TIME");
      const arrayData = [product];
      console.log(product, arrayData);
      const json_data = JSON.stringify(arrayData);
      setCookie("cart", json_data, { maxAge: 86400 });
    } else {
      console.log("SECOND TIME");
      const response_data = cart;
      if (response_data.find((each) => each.id === product.id)) {
        response_data.find((each) => each.id === product.id).amount += 1;
        console.log("found");
        // response_data[response_data.indexOf(product.id)]["amount"] += 1;
      } else {
        response_data.push(product);
      }

      setCookie("cart", response_data, { maxAge: 86400 });
    }
  };
  return (
    <SessionContext.Provider
      value={{
        loading,
        user,
        login: handleLogin,
        logout: handleLogout,
        userCookie: userData,
        token: token,
        cart: cart,
        addProductToCart: handleAddCart,
        clearCart: handleClearCart,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);

export default SessionContext;
