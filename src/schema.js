const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User{
        id: ID!
        name: String!
}
type Marker {
    id: ID!
    name: String
    lat: Float!
    lng: Float!
}
extend type Query {
    user(id: ID!): User
    allUsers(): [User!]
    allMarkers(): [Marer !]
    marker(id: ID!): Marker
}
extend type Mutation {
    createUser(name: String!, password: String!): User!
    createMarker(name: String, lat: Float!, lng: Float!): Marker!
}
`;
module.exports = typeDefs;
