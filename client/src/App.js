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
  let isLoggedIn = false;
  const [cookies, setCookie, removeCookie] = useCookies(['wastr_session']);

  function login(e, name) {
    e.preventDefault();
    const id = uuid.v4();
    setCookie('wastr_session', id, { path: '/' });
    props.addUserMutation({
      variables: {
        id: id,
        name: name
      }
    })
    window.location.assign('/waste')
  }
  function logout() {
    isLoggedIn = false;
    removeCookie('wastr_session');
    window.location.assign('/')
  }

  if (cookies.wastr_session) {
    isLoggedIn = true;
  }

  return (
    <CookiesProvider>
      <div className="App">
        <Nav userCookie={cookies.wastr_session} loggedIn={isLoggedIn} login={login} logout={logout} />

      </div>
    </CookiesProvider>
  );
}

export default graphql(addUserMutation, { name: "addUserMutation" })(withCookies(App));
