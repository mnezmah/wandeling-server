import { gql } from "apollo-server-express";
import markerSchema from "./maker";
import userSchema from "./user";

const baseSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutaion {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`;

export default [baseSchema, userSchema, markerSchema];
