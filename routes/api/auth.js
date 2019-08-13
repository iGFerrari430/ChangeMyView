const express = require('express')
const router = express.Router()
const validator = require('validator')
const User = require('./models/user')


// Backend code goes here

router.post("/Register",async (req,res) => {
    const {userName, email, password1, password2, registerDate} = req.body
    //check if password 1 and 2 matches
    if (password1 === password2){
        if(userName.length<5){
            res.status(400).send("The userName should be longer than 5! please try again! ")
        }else{
        const user = new User({userName: userName, email: email, password: password1, registerDate: registerDate})
        try{
            //check if the user has already been registered
            const sameNameUsers = await User.findOne({userName: user.userName})
            if (!sameNameUsers){
                try{
                    //chcek if the email address has already been registered
                    const sameEmailUsers = await User.findOne({email: user.email})
                    if(!sameEmailUsers){
                        //save the user into db
                        await user.save()
                        res.status(200).send(user)
                    }else{
                        res.status(400).send("The email address is already exist! Please try another one!")
                    }

                }catch(error){
                    res.status(500).send("There is something wrong with your internet!")
                }
            }else{
                res.status(400).send("The username is already exist! Please try another one!")
            }

        }catch(e){
            res.status(500).send("There is something wrong with your internet!")
        }
    }
    }else{
        res.status(400).send("The password one and two does not match, please check them again!")
    }


})

router.post("/Login",async (req,res) => {
    try{
        //check if the user has a valid email address and the password matched
        const user = await User.findbyCredentials(req.body.email, req.body.password)
        res.status(200).send(user)
    }catch(e){
        res.status(400).send("The email address does not exist or the password does not match! please try again!");
    }
})

// end of backend code


module.exports = router;
