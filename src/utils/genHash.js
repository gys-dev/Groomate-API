
const bcrypt = require("bcryptjs");
const crypto = require('crypto');

export default async function genHash(text) {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(text, salt);
    return hash;

}

export async function compareHash(hash, plainText) {
    return await bcrypt.compare(plainText, hash);
}

export function hashMD5(str) {
    return crypto.createHash('md5').update(str).digest("hex");
}