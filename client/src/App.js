import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Nav from './Components/Nav';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Nav />
      </div>
    </ApolloProvider>
  );
}

export default App;
