import { GraphQLDateTime } from "graphql-iso date";
const customResolver = {
    Date: GraphQLDateTime,
};
import { GraphQLDateTime } from "graphql-iso-date";
import userResolver from "./user";
import mkarkerResolver from "./user";

export default [customResolver, userResolver, mkarkerResolver];
