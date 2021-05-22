const { ApolloServer } = require("apollo-server");
const resolvers = require("./src/resolvers");
const typeDefs = require("./src/schema");
const express = require("express");
import { connectMongo } from "./src/model";

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const PORT = process.env.PORT || 5000;
server.applyMiddleware({ app });

connectMongo()
    .then(() => {
        process.on("uncaughtException", (err) => {
            console.error(
                `${new Date().toUTCString()} uncaughtException:`,
                err
            );
            console.log(`Connecterdto Mongo DB at ${PORT}`);
            process.exit(0);
            app.listen(PORT, () =>
                console.log(`Server started on port ${PORT}`)
            );
        });
    })
    .catch((error) => {
        console.log(error);
    });
