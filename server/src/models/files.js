// src/models/file.js
const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    mimetype: String,
    size: Number,
    uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("File", fileSchema);
