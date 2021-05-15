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
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
