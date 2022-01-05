const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.get("/getUsers", async(req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error){
        res.status(500);
    }
})
router.post("/register", async (req, res) => {
    const user = new User(req.body);
    const username = req.body.username;
    const alreadyregister = await User.findOne({username: username});
    if(alreadyregister){
        return res.status(409);
    }
    user.password = await bcrypt.hash(user.password,10);
    const saveduser = user.save();
    res.status(200).json(saveduser);
})
router.post("/login", async(req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.json("User not found.");
    }
    try{
    const password = await bcrypt.compare(req.body.password, user.password)
    if(!password){
        return res.status(404).json("wrong password");
    }
    user.token = jwt.sign(user.email, process.env.TOKEN_KEY);
    res.status(200).json(user);}
    catch (error){
        res.status(500);
    }
})
module.exports = router;