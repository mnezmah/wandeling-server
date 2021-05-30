import Express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import Schema from "./schema";

//config
const PORT = process.env.port || 5000;

const app = Express();

app.use(cors());
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
