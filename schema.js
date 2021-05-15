const axios = require("axios");
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
} = require("graphql");

const LaunchType = new GraphQLObjectType({
    name: "Launch",
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        flaunch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQString },
        launch_success: { type: GraphQLBoolean },
        rocket: { type: RocketType },
    }),
});

//Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parrent, args) {
                return axios
                    .get("http://api.spaxexdata.com/v3/launches")
                    .then((res) => res.data);
            },
        },
    },
});
