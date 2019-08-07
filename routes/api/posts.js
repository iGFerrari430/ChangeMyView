const mongoose = require("mongoose")
const express = require('express');
const router = express.Router();
const Topic = require("./models/topic")
const Proposition = require("./models/proposition")
const Argument = require("./models/argument")
const Comment = require("./models/comment")
const User = require("./models/user")
const History = require("./models/history")
// backend code starts here 

router.get("/Get/allTopics",async (req,res) => {
    const topics = await Topic.find({})
    topics.sort(function(a, b){return b.postDate - a.postDate})
    res.status(200).send(topics)

})

router.get("/Get/specificTopic/:tId", async (req, res) =>{
    //console.log("req body is: ",req.body);
    const tId = req.params.tId;
    const topic = await Topic.findOne({_id: mongoose.Types.ObjectId(tId)});

    if(topic){
        res.status(200).send(topic)
    }else{
        res.status(400).send("The title name does not exist! zxwsb")
    }
})

router.post("/Post/proposition", async (req, res) => {
    const {topicId, content} = req.body
    //get the topic object from the given topic title
    const topic = await Topic.findOne({_id: mongoose.Types.ObjectId(topicId)})

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
    const {topicId, proposition_id, argument_title, argument_plaintext, argument_richtext} = req.body
    // console.log(typeof proposition_id)
    const proposition = await Proposition.findOne({_id: mongoose.Types.ObjectId(proposition_id)})
    if (proposition){
        const topic = await Topic.findOne({_id: mongoose.Types.ObjectId(topicId)})
        if (topic){

            const argument = new Argument({userName: proposition.userName, postDate: proposition.postDate, title: argument_title, plainTextContent: argument_plaintext, richTextContent: argument_richtext})
            const props = topic.proposition
            
            var check = -1

            for(i=0; i<props.length; i++){
                if (String(props[i]._id)===String(proposition._id)){
                    check = i
                }
            }
            topic.proposition.splice(check, 1)
            proposition.argument.push(argument)
            topic.proposition.splice(check, 0, proposition)

            // topic.proposition.splice( topic.proposition.indexOf(proposition), 1 );\

            try{
                await proposition.save()
                await argument.save()
                await topic.save()
                res.status(200).send("save argument")
            }catch(e){
                res.status(500).send(e)
            }
        }else{
            res.status(400).send("Cannot find topic id! zxwsb")
        }
    }else{
        res.status(400).send("cannot find proposition title! zxwsb")
    }

})

router.post("/Post/comment", async(req, res) =>{
    const {post_id, post_date, topic_id, proposition_id, argument_id,comment_content} = req.body

    const proposition = await Proposition.findOne({_id: mongoose.Types.ObjectId(proposition_id)})
    const topic = await Topic.findOne({_id: mongoose.Types.ObjectId(topic_id)})
    const argument = await Argument.findOne({_id: mongoose.Types.ObjectId(argument_id)})

    if (proposition && topic && argument){
        const comment = new Comment({userName: post_id, postDate: post_date, content: comment_content, numLike: 0})

        topic.proposition.splice(topic.proposition.indexOf(proposition), 1)
        proposition.argument.splice(proposition.argument.indexOf(argument), 1)
        argument.comment.push(comment)
        proposition.argument.push(argument)
        topic.proposition.push(proposition)

        try{
            await comment.save()
            await proposition.save()
            await argument.save()
            await topic.save()
            res.status(200).send("save comment")
        }catch(e){
            res.status(400).send(e)
        }
    }else{
        res.status(400).send("cannot find topic or proposition or comment id! zxwdsb")
    }
})

router.post("/Post/userHistory", async(req, res) => {
    const {user_id, topic_id, isFinished, propIndex, argIndex, tempHonor, tempExperience, listenRecorder,userStand} = req.body
    console.log(1)
    
    const user = await User.findOne({_id: mongoose.Types.ObjectId(user_id)})
    if (user){
        var history = undefined
        if (user.history){
            for (i=0; i<user.history.length; i++){
                if (user.history[i].topic_id === topic_id){
                    history = user.history[i]
                }
            }
        }
        // const check_history = await user.history.some(async(element) =>{
        //     return element.topicId === topic_id
        // })

        if (history){
            user.history.splice(user.history.indexOf(history), 1)
        }

        const new_history = new History({topic_id: topic_id, isFinished: isFinished, propIndex: propIndex, argIndex: argIndex, tempHonor: tempHonor, tempExperience: tempExperience, listenRecorder: listenRecorder,userStand: userStand})
        console.log(new_history)
        user.history.push(new_history)

        try{
            await new_history.save()
            await user.save()
            res.status(200).send("The user history have been changed")
        }catch(e){
            res.status(500).send(e)
        }

    }else{
        res.status(400).send("The user_id does not exist! ZXWSB")
    }
})

router.get("/Get/userHistory/:topic_id/:userName", async(req, res) =>{

    const topic_id = req.params.topic_id;
    const userName = req.params.userName;

    const user = await User.findOne({userName})
    console.log(user)

    if(user){
        var history = null
        for (i=0; i<user.history.length; i++){
            if (user.history[i].topic_id === topic_id){
                history = user.history[i]
            }
        }
        res.status(200).send(history)

    }else{
        res.status(400).send("cannot find userid")
    }
})

router.post("/Post/Everythingfortest", async (req, res) =>{
    const {topic_user, topic_title, topic_postDate, topic_richTextContent, topic_plainTextContent,
        prop1_user, prop1_postDate, prop1_content, 
        arg1_user, arg1_title, arg1_postDate, arg1_richTextContent, arg1_plainTextContent,
        prop2_user, prop2_postDate, prop2_content, 
        arg2_user, arg2_title, arg2_postDate, arg2_richTextContent, arg2_plainTextContent
        } = req.body
    arg1 = new Argument({userName: arg1_user, postDate: arg1_postDate, title: arg1_title, richTextContent: arg1_richTextContent, plainTextContent:arg1_plainTextContent})
    arg2 = new Argument({userName: arg2_user, postDate: arg2_postDate, title: arg2_title, richTextContent: arg2_richTextContent, plainTextContent:arg2_plainTextContent})
    // arg3 = new Argument({userName: "dummy3", postDate: arg1_postDate, title: "arg3", richTextContent: "", plainTextContent:"arg3_pt"})
    // arg4 = new Argument({userName: "dummy4", postDate: arg2_postDate, title: "arg4", richTextContent: "", plainTextContent:"arg4_pt"}) 
    prop1 = new Proposition({userName: prop1_user, postDate: prop1_postDate, content:prop1_content})
    prop2 = new Proposition({userName: prop2_user, postDate: prop2_postDate, content:prop2_content})
    prop1.argument.push(arg1)
    prop2.argument.push(arg2)
    // prop2.argument.push(arg3)
    // prop2.argument.push(arg4)

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
