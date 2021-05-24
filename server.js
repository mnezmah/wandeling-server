import Express from "express";
import { graphqlHTTP } from "express-graphql";
import Schema from "./schema";

//config
const PORT = process.env.port || 5000;

const app = Express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema: Schema,
        pretty: true,
        graphiql: true,
    })
);

app.listen(PORT, () => {
    console.log(`servers startd at port: ${PORT}`);
});
