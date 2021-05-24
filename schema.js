import {
    GraphQLObjectType,
    graphString,
    graphQLFloat,
    GraphQLList,
    GraphQLSchema,
} from "graphql";
import Db from "./db";

const User = new GraphQLObjectType({
    name: "User",
    description: "This represent an User",
    fields: () => {
        return {
            id: {
                type: graphQLString,
                resolve(user) {
                    return user.id;
                },
            },
            name: {
                type: graphString,
                resolve(user) {
                    return user.name;
                },
            },
            password: {
                type: graphString,
                resolve(user) {
                    return user.password;
                },
            },
        };
    },
});

const Marker = new GraphQLObjectType({
    name: "Marker",
    description: "This represent an Google map marker",
    fields: () => {
        return {
            id: {
                type: graphQLString,
                resolve(marker) {
                    return marker.id;
                },
            },
            title: {
                type: graphString,
                resolve(marker) {
                    return marker.title;
                },
            },
            lat: {
                type: graphQLFloat,
                resolve(marker) {
                    return marker.lat;
                },
            },
            lon: {
                type: graphQLFloat,
                resolve(marker) {
                    return marker.lon;
                },
            },
        };
    },
});

const RootQuery = new GraphQLObjectType({
    name: "Query",
    description: "This is a root query",
    fields: () => {
        return {
            users: {
                type: new GraphQLList(User),
                args: {
                    id: {
                        type: graphQLString,
                    },
                    name: {
                        type: graphQLString,
                    },
                },
                resolve(root, args) {
                    return Db.models.user.findAll({ where: args });
                },
            },
        };
    },
});

const Schema = new GraphQLSchema({
    query: Query,
});

export default Schema;
