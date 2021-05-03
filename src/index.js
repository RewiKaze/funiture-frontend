import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from './App';
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { SessionProvider } from './contexts/SessionContext'
import reportWebVitals from "./reportWebVitals";
import {setContext} from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://funiture-backend.herokuapp.com/graphql',
});

const getCookie = (cname) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const authLink = setContext((_, { headers }) => {
  const token = getCookie("token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: 'include',
  link: authLink.concat(httpLink),
})




// const client = new ApolloClient({
//   uri: 'https://funiture-backend.herokuapp.com/graphql',
//   cache: new InMemoryCache(),
//   credentials: 'include',
// })

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <SessionProvider>
            <App />
          </SessionProvider>
        </ApolloProvider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
