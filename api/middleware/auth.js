const jwt = require('jsonwebtoken');
const config = process.env;

const verifyToken = (req, res, next) => {
    var bearer = req.headers["authorization"];
    bearer = bearer.split(" ");
    const token = bearer[1];
    if(!token){
        return res.status(403).json("no token.");
    }
    jwt.verify(token, config.TOKEN_KEY, (err, user) =>{
        if(err){
            return res.status(403).json(err);
        }
        req.token = user;
        next();
    });
}

module.exports = verifyToken;