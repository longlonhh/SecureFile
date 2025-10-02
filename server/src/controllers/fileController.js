const { encrypt, decrypt } = require('../utils/cryptoUtils');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

// Upload and encrypt file
async function uploadFile(req, res) {
    try {
        if (!req.file) return res.status(400).send('No file uploaded.');

        const encrypted = encrypt(req.file.buffer);
        
        const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'files' });

        const uploadStream = bucket.openUploadStream(req.file.originalname, {
            metadata: { iv: encrypted.iv }
        });

        res.json({ fileId: uploadStream.id });
    }   catch (error) {
        res.status(500).send('Error uploading file.');
    }
}

async function listFiles(req, res) {
    try {
        const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'files' });

        const files = await bucket.find().toArray();
        res.json(files);
    } catch (error) {
        res.status(500).send('Error fetching files.');
    }
}

async function downloadFile(req, res) {
    try {
        const fileId = new mongoose.Types.ObjectId(req.params.id);
        const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'files' });

        const downloadStream = bucket.openDownloadStream(fileId);

        let data = [];
        downloadStream.on('data', (chunk) => data.push(chunk));
        downloadStream.on('end', () => {
            const buffer = Buffer.concat(data);
            const decrypted = decrypt({
                iv: req.query.iv,
                content: buffer.toString('hex'),
            });
            res.send(decrypted);
        });
        downloadStream.on('error', (err) => 
            res.status(500).send('Error downloading file.')
        ); 
    } catch (error) {
        res.status(500).send('Error downloading file.');
    }
}

module.exports = { uploadFile, downloadFile, listFiles };