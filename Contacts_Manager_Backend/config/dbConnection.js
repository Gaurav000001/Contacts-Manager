const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Connection established ", connection.connection.name, connection.connection.host);
    }
    catch(error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;