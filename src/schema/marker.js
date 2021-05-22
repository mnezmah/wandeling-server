const { gql } = require("apollo-server-express");

export default gql`
type Marker {
    id: ID!
    name: String
    lat: Float!
    lng: Float!
}
extend type Query {
    allMarkers(): [Marer !]
    marker(id: ID!): Marker
}
extend type Mutation {
    createMarker(name: String, lat: Float!, lng: Float!): Marker!
    deleteMarker(id: ID!): Boolean
}
extend type Subscription {}
`;
