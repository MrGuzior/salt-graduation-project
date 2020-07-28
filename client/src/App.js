import React from 'react';
import './App.css';
import Nav from './Components/Nav'
import { CookiesProvider, withCookies, useCookies } from 'react-cookie';
import { gql } from "apollo-boost";
import { graphql } from 'react-apollo';
const uuid = require('uuid');

const addUserMutation = gql`
		mutation($id: String!, $name: String!){
			addUser(id: $id, name: $name) {
        id
				name
			}
		}
`;

function App(props) {
  const id = uuid.v4();
  const [cookies, setCookie] = useCookies(['wastr_session']);
  //const cookie = cookies.wastr_session;

  if (!cookies.wastr_session) {
    setCookie('wastr_session', id, { path: '/' });
    props.addUserMutation({
      variables: {
        id: id,
        name: "Mr. Duck"
      }
    })
  }

  return (
    <CookiesProvider>
      <div className="App">
        <Nav userCookie={cookies.wastr_session} />

      </div>
    </CookiesProvider>
  );
}

export default graphql(addUserMutation, { name: "addUserMutation" })(withCookies(App));
