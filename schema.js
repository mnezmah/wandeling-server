import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
} from "graphql";
import Db from "./db";

const User = new GraphQLObjectType({
    name: "User",
    description: "This represent an User",
    fields() {
        return {
            id: {
                type: GraphQLString,
                resolve(user) {
                    return user.id;
                },
            },
            name: {
                type: GraphQLString,
                resolve(user) {
                    return user.name;
                },
            },
            password: {
                type: GraphQLString,
                resolve(user) {
                    return user.password;
                },
            },
            markers: {
                type: new GraphQLList(Marker),
                resolve(user) {
                    return user.getMarkers();
                },
            },
        };
    },
});

const AuthData = new GraphQLObjectType({
    name: "Auth",
    description: "endpoint for authentication",
    fields() {
        return {
            id: {
                type: GraphQLString,
                resolve(user) {
                    return user.id;
                },
            },
            token: {
                type: GraphQLString,
                resolve(user) {
                    return user.id;
                },
            },
        };
    },
});

const Marker = new GraphQLObjectType({
    name: "Marker",
    description: "This represent an Google map marker",
    fields: () => ({
        id: {
            type: GraphQLString,
            resolve(marker) {
                return marker.id;
            },
        },
        title: {
            type: GraphQLString,
            resolve(marker) {
                return marker.title;
            },
        },
        lat: {
            type: GraphQLFloat,
            resolve(marker) {
                return marker.lat;
            },
        },
        lon: {
            type: GraphQLFloat,
            resolve(marker) {
                return marker.lon;
            },
        },
        user: {
            type: User,
            resolve(marker) {
                return marker.getUser();
            },
        },
    }),
});

const Query = new GraphQLObjectType({
    name: "Query",
    description: "This is a root query",
    fields: () => ({
        users: {
            type: new GraphQLList(User),
            args: {
                id: {
                    type: GraphQLString,
                },
                name: {
                    type: GraphQLString,
                },
            },
            resolve(root, args) {
                return Db.models.user.findAll({ where: args });
            },
        },
        user: {
            type: User,
            args: {
                id: {
                    type: GraphQLString,
                },
            },
            resolve(root, args) {
                return Db.models.user.findOne({ where: args });
            },
        },
        markers: {
            type: new GraphQLList(Marker),
            args: {
                id: {
                    type: GraphQLString,
                },
                title: {
                    type: GraphQLString,
                },
            },
            resolve(root, args) {
                return Db.models.marker.findAll({ where: args });
            },
        },
        login: {
            name: {
                type: GraphQLString,
            },
        },
    }),
});

const Mutation = new GraphQLObjectType({
    name: "Mutations",
    description: "functions to create user or marker",
    fields() {
        return {
            addUser: {
                type: User,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                    password: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                },
                resolve(source, args) {
                    return Db.models.user.create({
                        name: args.name,
                        password: args.password,
                    });
                },
            },
        };
    },
});

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});

export default Schema;
