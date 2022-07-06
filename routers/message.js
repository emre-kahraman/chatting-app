const message = require("../models/Message.js");
const router = require("express").Router();
const auth = require("../middleware/auth.js");

router.post("/addMessage", auth, async(req, res) => {
    const sendMessage = new message(req.body);
    try{
        const savedMessage = await sendMessage.save();
        res.status(200).json(savedMessage);
    }
    catch (error){
        res.status(500);
    }
})

router.get("/findMessage/:conversation", auth, async(req, res) => {
    try{
        const messages = await message.find({
            conversation: req.params.conversation
        })
        res.status(200).json(messages);
    }
    catch (error){
        res.status(500);
    }
})

router.get("/searchMessage/:text", auth, async(req,res) => {
    try{
        const messages = await message.find({
            text: { $in: [req.params.text]}
        })
        if(messages.length==0){
            return res.status(500).json("text not found in messages.")
        }
        res.status(200).json(messages);
    }
    catch {
        res.status(500);
    }
})
module.exports = router;