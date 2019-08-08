const express = require('express');
const router = express.Router();
const User = require("./models/user")
const Topic = require("./models/topic")
const Proposition = require("./models/proposition")
const mongoose = require("mongoose")
// backendCode Start here 

router.get("/Get/keyword/:keyword", async (req, res) => {
    const keyword = req.params.keyword
    const result = await Topic.find({
        $or: [ {title: {$regex: keyword, $options: 'i'}}, {plainTextContent: {$regex: keyword, $options: 'i'}}]
    })

    res.status(200).send(result)

})

router.get("/Get/userProfileInfo/:userName", async (req,res)=>{
    const userName = req.params.userName
    const user = await User.findOne({userName})

    var result = {
        basicInfo: {honor: user.honor, experience: user.experience, registerDate: user.registerDate}, 
        viewHistory: user.history, 
        arguHistory: undefined
    }
    const proposition = await Proposition.find({userName: user.userName})
    result.arguHistory = proposition

    res.status(200).send(result)
    
})




// end of backend code
module.exports = router;
