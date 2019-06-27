const express = require('express');
const router = express.Router();

// Backend code goes here

router.post("/Register",async(req,res) => {
    console.log(req.body);

    return res.json({
        "UserInfo": "大傻逼"
    })
})

router.post("/Login",async(req,res) => {
    console.log(req.body);

    return res.json({
        "Data": "臭傻逼"
    })
})



// end of backend code


module.exports = router;
