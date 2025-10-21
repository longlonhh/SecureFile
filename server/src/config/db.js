const mongoose = require("mongoose");

async function connectDB() {
    try {
        const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
        const dbName = process.env.DB_NAME || 'securefile_db';

        console.log("Đang kết nối đến MongoDB...");
        console.log("URI:", uri);
        console.log("Database:", dbName);

        await mongoose.connect(uri, {
            dbName: dbName
        });

        console.log("Kết nối MongoDB thành công!");
        console.log("Database:", mongoose.connection.db.databaseName);
        
    } catch (error) {
        console.error("Lỗi kết nối MongoDB:", error.message);
        
        console.log("\nHướng dẫn khắc phục:");
        console.log("1. Đảm bảo MongoDB đang chạy trên máy local");
        console.log("2. Hoặc sử dụng MongoDB Atlas (cloud)");
        console.log("3. Kiểm tra file .env có đúng MONGO_URI không");
        
        process.exit(1);
    }
}

module.exports = { connectDB };
