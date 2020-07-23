const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require("cors");
const fs = require('fs');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const schema = buildSchema(`
    type Query {
        users: [User],
        user(id: String): User,
        global: [Global],
        discarded: [Discarded],
        incinerated: [Incinerated],
        recycled: [Recycled],
        news: [News]
    }

    type News{
        date: String,
        heading: String,
        text: String,
        source: String
    }

    type Discarded{
        year: String,
        tonnes: String
    }

    type Incinerated{
        year: String,
        tonnes: String
    }

    type Recycled{
        year: String,
        tonnes: String
    }

    type Global {
            year: String,
            tonnes: String
    }

    type User {
        name: String,
        id: String,
        waste_history: [Waste]
    }

    type Waste {
        date: String,
        amount: String,
        type: String
    }
`);

const root = {
    users: () => {
        return data.data.users;
    },
    user: (args) => {
        return data.data.users.find(user => user.id == args.id);
    },
    id: () => {
        return data.data.users[0].id;
    },
    global: () => {
        return data.global;
    },
    discarded: () => {
        return data.discarded;
    },
    incinerated: () => {
        return data.incinerated;
    },
    recycled: () => {
        return data.recycled;
    },
    news: () => {
        return data.news;
    }
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))

module.exports = app;
