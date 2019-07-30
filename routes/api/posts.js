const mongoose = require("mongoose")
const express = require('express');
const router = express.Router();
const Topic = require("./models/topic")
const Proposition = require("./models/proposition")
const Argument = require("./models/argument")
// backend code starts here 

router.get("/Get/allTopics",async (req,res) => {
    const topics = await Topic.find({})
    topics.sort(function(a, b){return b.postDate - a.postDate})
    res.status(200).send(topics)

})

router.get("/Get/specificTopic/:tId", async (req, res) =>{
    //console.log("req body is: ",req.body);
    const tId = req.params.tId;
    console.log(tId);
    const topic = await Topic.findOne({_id: mongoose.Types.ObjectId(tId)});

    if(topic){
        res.status(200).send(topic)
    }else{
        res.status(400).send("The title name does not exist! zxwsb")
    }
})

router.post("/Post/proposition", async (req, res) => {
    const {topic_title, content} = req.body
    //get the topic object from the given topic title
    const topic = await Topic.findOne({title: topic_title})

    //check if the topis exist
    if (topic){
        const prop = new Proposition({userName: topic.userName, postDate: topic.postDate, content: content})
        
        //add the proposition into the topic
        topic.proposition.push(prop)

        try{
            await prop.save()
            await topic.save()
            res.status(200).send("save proposition")
        }catch(e){
            res.status(400).send("cannot save prop or topic")
        }
    }else{
        res.status(400).send("The title name does not exist! zxwsb")
    }
})

router.post("/Post/argument", async (req, res) => {
    const {topic_title, proposition_id, argument_title, argument_plaintext, argument_richtext} = req.body
    // console.log(typeof proposition_id)
    const proposition = await Proposition.findOne({_id: mongoose.Types.ObjectId(proposition_id)})
    if (proposition){
        const topic = await Topic.findOne({title: topic_title})
        if (topic){

            const argument = new Argument({userName: proposition.userName, postDate: proposition.postDate, title: argument_title, plainTextContent: argument_plaintext, richTextContent: argument_richtext})

            topic.proposition.splice( topic.proposition.indexOf(proposition), 1 );
            proposition.argument.push(argument)
            topic.proposition.push(proposition)

            try{
                await proposition.save()
                await argument.save()
                await topic.save()
                res.status(200).send("save argument")
            }catch(e){
                res.status(400).send(e)
            }
        }else{
            res.status(400).send("Cannot find proposition id! zxwsb")
        }
    }else{
        res.status(400).send("cannot find topic title! zxwsb")
    }

})

router.post("/Post/Everythingfortest", async (req, res) =>{
    const {topic_user, topic_title, topic_postDate, topic_richTextContent, topic_plainTextContent,
        prop1_user, prop1_postDate, prop1_richTextContent, prop1_plainTextContent, 
        arg1_user, arg1_title, arg1_postDate, arg1_richTextContent, arg1_plainTextContent,
        prop2_user, prop2_title, prop2_postDate, prop2_richTextContent, prop2_plainTextContent,
        arg2_user, arg2_title, arg2_postDate, arg2_richTextContent, arg2_plainTextContent
        } = req.body
    arg1 = new Argument({userName: arg1_user, postDate: arg1_postDate, title: arg1_title, richTextContent: arg1_richTextContent, plainTextContent:arg1_plainTextContent})
    arg2 = new Argument({userName: arg2_user, postDate: arg2_postDate, title: arg2_title, richTextContent: arg2_richTextContent, plainTextContent:arg2_plainTextContent})
    prop1 = new Proposition({userName: prop1_user, postDate: prop1_postDate, richTextContent:prop1_richTextContent, plainTextContent: prop1_plainTextContent})
    prop2 = new Proposition({userName: prop2_user, postDate: prop2_postDate, richTextContent:prop2_richTextContent, plainTextContent: prop2_plainTextContent})
    prop1.argument.push(arg1)
    prop2.argument.push(arg2)

    topic = new Topic({userName: topic_user, title: topic_title, postDate: topic_postDate, richTextContent: topic_richTextContent, plainTextContent: topic_plainTextContent})
    topic.proposition.push(prop1)
    topic.proposition.push(prop2)

    try{
        await arg1.save()
        await arg2.save()
        await prop1.save()
        await prop2.save()
        await topic.save()
        res.status(200).send("save everything")
    }catch(e){
        res.status(400).send(e)
    }

})

router.post("/Post/Topic", async (req, res) => {
    const {rich_tc, plain_tc, title, userName, postDate, proposition1, proposition2} = req.body

    const prop1 = new Proposition({userName: userName, postDate: postDate, content: proposition1})
    const prop2 = new Proposition({userName: userName, postDate: postDate, content: proposition2})
    const topic = new Topic({richTextContent: rich_tc, plainTextContent: plain_tc, title: title, userName: userName, postDate: postDate, proposition: [prop1, prop2]})
    try{
        await prop1.save()
        await prop2.save()
        await topic.save()
        res.status(200).send("save topic")
    }catch(e){
        res.status(400).send(e)
    }
})


//backend code ends here 
module.exports = router;
