const jwt = require('jsonwebtoken');
const config = process.env;

const verifyToken = (req, res, next) => {
    var bearer = req.headers["authorization"];
    if(!bearer){
        return res.status(403).json("no bearer.");
    }
    bearer = bearer.split(" ");
    const token = bearer[1];
    jwt.verify(token, config.TOKEN_KEY, (err, user) =>{
        if(err){
            return res.status(403).json(err);
        }
        req.token = user;
        next();
    });
}

module.exports = verifyToken;