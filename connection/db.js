const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/voxoAPI"; // this is a kind of mongodb config, mernstack is db name

/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    });
    console.log("database connected");
} catch (error) {
    console.log(error);
}

module.exports = {
    User: require('../models/user.model'),
};