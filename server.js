require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const wandelingSchema = require("./schema");

const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema: wandelingSchema,
        graphiql: true,
    })
);

const PORT = process.env.PORT || 5000;

process.on("uncaughtException", (err) => {
    console.error(`${new Date().toUTCString()} uncaughtException:`, err);
    process.exit(0);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
