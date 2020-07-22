import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Nav from './Components/Nav'
import { CookiesProvider, withCookies, useCookies } from 'react-cookie';
const uuid = require('uuid');

const client = new ApolloClient({
  uri: 'https://localhost:8080/graphql'
})


function App() {
  const id = uuid.v4();
  const [cookies, setCookie] = useCookies(['wastr_session']);
  const cookie = cookies.wastr_session;

  if (!cookies.wastr_session) {
    setCookie('wastr_session', id, { path: '/' });
  }

  return (
    <CookiesProvider>
      <ApolloProvider client={client}>
        <div className="App">
          <Nav userCookie={cookie} />

        </div>
      </ApolloProvider>
    </CookiesProvider>
  );
}

export default withCookies(App);
