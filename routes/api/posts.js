const express = require('express');
const router = express.Router();
const Topic = require("./models/topic")
const Proposition = require("./models/proposition")
// backend code starts here 

router.get("/Get/allTopics",async (req,res) => {
    const topics = await Topic.find({})
    topics.sort(function(a, b){return a.postDate - b.postDate})
    res.status(200).send(topics)

})



router.post("/Post/allTopics", async (req, res) => {
    const {rich_tc, plain_tc, title, userName, postDate, proposition1, proposition2} = req.body

    const prop1 = new Proposition({userName: userName, postDate: postDate, content: proposition1})
    const prop2 = new Proposition({userName: userName, postDate: postDate, content: proposition2})
    const topic = new Topic({richTextContent: rich_tc, plainTextContent: plain_tc, title: title, userName: userName, postDate: postDate, proposition: [prop1, prop2]})
    try{
        await prop1.save()
        await prop2.save()
        await topic.save()
        res.status(200).send("save")
    }catch(e){
        res.status(400).send(e)
    }
})


//backend code ends here 
module.exports = router;
