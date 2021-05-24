import Sequelize from "sequelize";
import _ from "lodash";
import Faker from "faker";
import { v4 as uuidv4 } from "uuid";

const Conn = new Sequelize(
    "wandeling", //name of the db
    "postgres", //postgres user
    "postgres", //postgres user pass
    { dialect: "postgres", host: "localhost" }
);

const User = Conn.define("user", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

const Marker = Conn.define("marker", {
    title: {
        type: Sequelize.STRING,
    },
    lat: { type: Sequelize.FLOAT, allowNull: false },
    lon: { type: Sequelize.FLOAT, allowNull: false },
});

//relationships
User.hasMany(Marker);
Marker.belongsTo(User);

Conn.sync({ force: true }).then(() => {
    _.times(10, () => {
        return User.create({
            name: Faker.name.firstName(),
            password: uuidv4(),
        }).then((user) => {
            return user.createMarker({
                title: `Some marker from ${user.name}`,
                lat: 13.56,
                lon: 54.876,
            });
        });
    });
});

export default Conn;
