import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getData = gql`
{
    goodbye
}
`

function Home(props) {
    console.log(props.data.goodbye)
    return (<p>This is home</p>)
}

export default graphql(getData)(Home);