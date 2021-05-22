const bcrypt = require("bcrypt");
const resolvers = {
    Query: {
        async user(root, { id }) {},
        async allUsers(root) {},
        async allMarkers(root) {},
        async marker(root, { id }) {},
    },
    Mutation: {
        async createUSer(root, { name, password }, { models }) {
            return await models.User.create({
                name,
                password: await bcrypt.hash(password, 10),
            });
        },
        async createMarker(root, { name, lat, lng }, { models }) {
            return models.Marker.create({
                name,
                lat,
                lng,
            });
        },
    },
};

module.exports = resolvers;
