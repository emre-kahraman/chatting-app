const chat = require("../models/Chat.js");
const router = require("express").Router();
const auth = require("../middleware/auth.js");

router.post("/addChat", async(req, res) => {
    const newchat = new chat({
        users: [req.body.user1, req.body.user2],
    });
    try{
        const savedchat = await newchat.save();
        res.status(200).json(savedchat);
    }
    catch (error){
        res.status(500);
    }
})
router.get("/findChat/:userId", auth, async(req, res) => {
    try{
        const userschat = await chat.find({
            users: { $in: [req.params.userId]}
        })
        res.status(200).json(userschat);
    }
    catch (error){
        res.status(500);
    }
})
module.exports = router;