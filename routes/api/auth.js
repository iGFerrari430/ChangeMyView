const express = require('express')
const router = express.Router()
const validator = require('validator')
const User = require('./models/user')


// Backend code goes here

router.post("/Register",async (req,res) => {
    const {userName, email, password1, password2} = req.body
    console.log(req.body);
    //check if password 1 and 2 matches
    if (password1 === password2){
        
        const user = new User({userName: userName, email: email, password: password1})
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
                        res.status(400).send("The email address is already exist! Please try another one! Or ask ZHUXIAOWEN for a new one")
                    }

                }catch(error){
                    res.status(500).send("There is something wrong with your internet! Ask ZHUXIAOWEN to fix it~!")
                }
            }else{
                res.status(400).send("The username is already exist! Please try another one! Or ask ZHUXIAOWEN for a new name")
            }

        }catch(e){
            res.status(500).send("There is something wrong with your internet! Ask ZHUXIAOWEN to fix it~!")
        }

    }else{
        res.status(400).send("The password one and two does not match, please check them again! Or ask ZHUXIAOWEN for a new one")
    }

})

router.post("/Login",async (req,res) => {
    try{
        //check if the user has a valid email address and the password matched
        const user = await User.findbyCredentials(req.body.email, req.body.password)
        res.status(200).send(user)
    }catch(e){
        res.status(400).send("OMG you are so stupid. Either password wrong or username no exist. Stop using our service.");
    }
})

// end of backend code


module.exports = router;
