const jwt = require('jsonwebtoken');
const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers["auth"];
    if(!token){
        return res.status(403).json("no token.");
    }
    try {
        const decode = jwt.verify(token, config.TOKEN_KEY);
        req.user = decode;
    } catch (error) {
        return res.status(500);       
    }
    return next();
}

module.exports = verifyToken;