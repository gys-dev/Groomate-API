const jwt = require("jsonwebtoken");
const Boom = require("@hapi/boom");
import '../env';
const {hashMD5} = require('../utils/genHash')
const privateKey = process.env.APP_JWT_PRIVATE_KEY;

export default function auth (req, res, next) {
    const token = req.header('token');
    if (!token) 
        return res.status(401).json({ message: "Auth Error" });
    try {
        const decoded = jwt.verify(token, privateKey);
        if (decoded.id) { 
            let channels = {
                private: hashMD5('user_private_' + decoded.id),
                user: hashMD5('user_' + decoded.id),
            }

            res.locals.authUser = decoded;
            res.locals.channels = channels;

            next();
            return;
        }
        return res.status(401).json({ message: "Auth Error" });

        
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Invalid Token" });
    }
        
}