const User = require("../models/User.js");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth.js");
const redis = require("../config/redis.js");

router.get("/getUsers", auth, async(req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error){
        res.status(500).json(error);
    }
})
router.get("/getOnlineUsers", auth, async(req, res) => {
    let users = await redis.sMembers("online_users");
    if(users.length==0){
        return res.status(404).json(null);
    }
    if(users.length>1){
        users = "[" + users + "]";
    }
    try {
        const online_users = JSON.parse(users);
        res.status(200).json(online_users);
    } catch (error) {
        res.status(500).json(error);
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
    const saveduser = await user.save();
    res.status(200).json(saveduser);
})
router.post("/addFriend/:id", auth, async (req, res) => {
    const friend = await User.findById(req.params.id);
    const user = await User.findById(req.body.userid);
    if(!friend){
        return res.status(404).json("user not found");
    }
    try {
        await user.updateOne({ $push : {friendlist : req.params.id}})
        await friend.updateOne({ $push : {friendlist : req.body.userid}})
        const updatedUser = await User.findById(req.body.userid);
        res.status(200).json(updatedUser.friendlist);
    } catch (error) {
        res.status(500).json(error);
    }
})
router.get("/getFriends/:id", auth, async(req, res) => {
    const user = await User.findById(req.params.id);
    try {
        const friendlist = user.friendlist;
        res.status(200).json(friendlist);
    } catch (error) {
        res.status(500).json(error);
    }
})
router.delete("/deleteFriend/:id", auth, async(req, res) => {
    const user = await User.findById(req.body.userid);
    const friend = await User.findById(req.params.id);
    try {
        await user.updateOne({ $pull : {friendlist : req.params.id}});
        await friend.updateOne({ $pull : {friendlist : req.body.userid}});
        const updatedUser = await User.findById(req.body.userid);
        res.status(200).json(updatedUser.friendlist);
    } catch (error) {
        res.status(500).json(error);
    }
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
    const accessToken = jwt.sign({user: user.email}, process.env.TOKEN_KEY, { expiresIn: '30m'});
    const refreshToken = jwt.sign({user: user.email}, process.env.TOKEN_KEY, { expiresIn: '1h'});
    const token = {
        accessToken: accessToken,
        refreshToken: refreshToken};
    user.online = true;
    await user.save();
    redis.sAdd("online_users", JSON.stringify(user));
    res.status(200).json(token);}
    catch (error){
        res.status(500).json(error);
    }
})
router.post("/refreshToken", auth, async(req, res) => {
    try{
        const accessToken = jwt.sign({user: req.token.user}, process.env.TOKEN_KEY, { expiresIn: '30m'});
        const refreshToken = jwt.sign({user: req.token.user}, process.env.TOKEN_KEY, { expiresIn: '1h'});
        const token = {
            accessToken: accessToken,
            refreshToken: refreshToken};
        res.status(200).json(token);}
    catch (error){
        res.status(500).json(error);
    }
})
router.post("/logout", auth, async(req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.json("User not found.");
    }
    try{
    redis.sRem("online_users", JSON.stringify(user));
    user.online = false;
    await user.save();
    res.status(200).json(user);}
    catch (error){
        res.status(500).json(error);
    }
})
module.exports = router;