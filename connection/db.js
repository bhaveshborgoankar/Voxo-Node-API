import mongoose from "mongoose";

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/voxo"; // this is a kind of mongodb config, mernstack is db name

/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    console.log("database connected");
} catch (error) {
    console.log(error);
}
export default { User: require("../models/user_model"), };