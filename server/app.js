const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require("cors");

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const schema = buildSchema(`
    type Query {
        hello: String,
        goodbye: String
    }
`);

const root = {
    hello: () => {
        return 'Hello world!';
    },
    goodbye: () => {
        return 'Goodbye world!'
    }
};


app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))

module.exports = app;
