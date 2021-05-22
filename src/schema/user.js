const { gql } = require("apollo-server-express");

export default gql`
type User{
    id: ID!
    name: String!
}
extend type Query {
    user(id: ID!): User
    allUsers(): [User!]
}
extend type Mutation {
    createUser(name: String!, password: String!): User!
}
extend type Subscription {}
`;
