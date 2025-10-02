const mongoose = require("mongoose");

async function connectDB() {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is not defined");

    await mongoose.connect(uri, {
        dbName: process.env.DB_NAME || 'hoangminhngoctnhp_db_user'
    });

    console.log("Connected to MongoDB");
}

module.exports = { connectDB };
