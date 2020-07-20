const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

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

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
