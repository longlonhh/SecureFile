const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./src/config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
const fileRoutes = require("./src/routes/fileRoutes");
app.use("/api", fileRoutes);

app.use(express.static(path.join(__dirname, "../client/build")));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = app;
