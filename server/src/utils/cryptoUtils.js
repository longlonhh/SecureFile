const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const IV = crypto.randomBytes(16);

function encrypt(buffer){
    const cipher = crypto.createCipheriv(algorithm, key, IV);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return { iv: IV.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(encrypted){
    const iv = Buffer.from(encrypted.iv, 'hex');
    const encryptedText = Buffer.from(encrypted.encryptedData, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted;
}

module.exports = { encrypt, decrypt };