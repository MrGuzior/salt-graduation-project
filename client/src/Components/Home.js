import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getData = gql`
{
    hello
}
`

function Home(props) {
    console.log(props.data.hello)
    return (<p>This is home</p>)
}

export default graphql(getData)(Home);