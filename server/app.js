const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require("cors");
const MongoClient = require('mongodb');
const fs = require('fs');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));
//console.log(data.data.users[0].waste_history)

// const dbURL = 'mongodb://localhost:27017';
// const dbName = 'Wastr';

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const insertDocuments = function (db, callback) {
//     // Get the documents collection
//     const collection = db.collection('Wastr');
//     // Insert some documents
//     collection.insertMany([
//         { a: 1 }, { a: 2 }, { a: 3 }
//     ], function (err, result) {
//         assert.equal(err, null);
//         assert.equal(3, result.result.n);
//         assert.equal(3, result.ops.length);
//         console.log("Inserted 3 documents into the collection");
//         callback(result);
//     });
// }

// MongoClient.connect(dbURL, function (err, client) {
//     console.log("Connected successfully to server");

//     const db = client.db(dbName);

//     insertDocuments(db, function () {
//         client.close();
//     });
// });



const schema = buildSchema(`
    type Query {
        users: [User],
        user(id: String): User
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
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))

module.exports = app;
