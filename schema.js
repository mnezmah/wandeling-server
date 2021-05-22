const { gql } = require("apollo-server-express");

const rootType = gql`
    type Query {
        root: String
    }
    type Mutation {
        root: String
    }
`;

module.exports = [rootType];

///
const axios = require("axios");
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
} = require("graphql");

//Hardcoded data
const users = [
    { id: "1", name: "Mario" },
    { id: "2", name: "Nikolina" },
    { id: "3", name: "Mirko" },
];

// UserType
const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
    }),
});

//Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType", // give it name whatever you want
    fields: {
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                return users.find((user) => user.id === args.id);
            },
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return users;
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
