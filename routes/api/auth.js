const express = require('express')
const router = express.Router()
const validator = require('validator')
const User = require('./model_auth/user')


// Backend code goes here

router.post("/Register",async(req,res) => {
    const {userName, email, password1, password2} = req.body
    console.log(req.body);
    if (password1 === password2){
        const user = new User({userName: userName, email: email, password: password1})
        User.findOne({userName: user.userName}).then((sameNameUsers) => {
            if (!sameNameUsers){
                User.findOne({email: user.email}).then((sameEmailUsers) => {
                    if (!sameEmailUsers){
                        user.save().then(() => {
                            res.status(200).send(user)
                        })
                    }else{
                        res.status(400).send("The email address is already exist! Please try another one! Or ask ZHUXIAOWEN for a new one")
                    }
                })
            }else{
                res.status(400).send("The username is already exist! Please try another one! Or ask ZHUXIAOWEN for a new name")
            }
        }).catch((e) => {
            res.status(500).send(e)
        })
    }else{
        res.status(400).send("The password one and two does not match, please check them again! Or ask ZHUXIAOWEN for a new one")
    }

    
})

router.post("/Login",async(req,res) => {

    User.findOne({email: req.body.email}).then((onRecordUser) => {
        if (!onRecordUser){
            res.status(400).send("The email address does not match any on the record! please try again! ")
        }else if(onRecordUser.password !== req.body.password){
            res.status(400).send("The password is not correct! please try again! ")
        }else{
            res.status(200).send(onRecordUser)
        }
    }).catch((e) => {
        res.status(500).send(e)
    })
})



// end of backend code


module.exports = router;
