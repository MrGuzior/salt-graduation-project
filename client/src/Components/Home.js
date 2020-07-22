import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getData = gql`
{
    users {
        id
        name
        waste_history {
            type
            date
            amount
        }
    }
    user(id: "12345"){
        id
        name
    }

}
`

function Home(props) {
    console.log(props.data.user)
    return (<p>This is home</p>)
}

export default graphql(getData)(Home);