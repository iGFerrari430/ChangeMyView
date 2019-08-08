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
    if(user){
        var result = {
            basicInfo: {honor: user.honor, experience: user.experience, registerDate: user.registerDate}, 
            viewHistory: [], 
            propHistory: undefined,
            topicHistory: undefined
        }
        console.log(user.history.length)
        for(i = 0; i< user.history.length && i < 15; i++){
            topic = await Topic.findOne({_id: mongoose.Types.ObjectId(user.history[i].topic_id)})
            result.viewHistory.push(topic)
        }
        const propositions = await Proposition.find({userName: user.userName})
        result.propHistory = propositions

        const topics = await Topic.find({userName: user.userName})
        result.topicHistory = topics

        res.status(200).send(result)
    }else{
        res.status(400).send("the userName does not exist!")
    }
    
})




// end of backend code
module.exports = router;
