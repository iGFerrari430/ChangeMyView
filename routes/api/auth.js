const express = require('express')
const router = express.Router()


// Backend code goes here

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

// const connectionURL = 'mongodb://127.0.0.1:27017'
// const database = 'CMV_manager'

/*
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/CMV-manager',{
    useNewUrlParser: true,
    useCreateIndex: true
})*/

const User = mongoose.model('User', {
    userName: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if (value.length<5){
                throw new Error('Username\'s length should longer than 5')
            }
        }
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required: true,
    }
})

router.post("/Register",async(req,res) => {
    console.log(req.body)

    return res.json({
        "UserInfo": "大傻逼"
    })
})

router.post("/Login",async(req,res) => {
    console.log(req.body)

    return res.json({
        "Data": "臭傻逼"
    })
})



// end of backend code


module.exports = router;
