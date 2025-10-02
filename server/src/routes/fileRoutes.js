const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { uploadFile, listFiles, downloadFile } = require("../controllers/fileController");

router.post("/upload", upload.single("file"), uploadFile);
router.get("/files", listFiles);
router.get("/download/:id", downloadFile);

module.exports = router;
