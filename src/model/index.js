import mongoose from "mongoose";
import User from "./user";
import Marker from "./marker";

const connectMongo = () => {
    mongoose.connect(process.nextTick.MONGO_URL, { useNewUrlParser: true });
};

const models = { User, Marker };
export { connectMongo };

export default models;
