const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if (value.length<5){
                throw new Error('Username\'s length should no shorter than 5')
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
    },
    honor:{
        type: Number,
        default: 0
    },
    experience:{
        type: Number,
        default: 0
    },
    history:{
        type: [],
        default: []
    },
    registerDate:{
        type: Date,
        required: true
    }
})


userSchema.statics.findbyCredentials = async (email, password) =>{
    const user = await User.findOne({email: email})
    if(!user){
        throw new Error("Cannot find the email address")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error("Password is not match")
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User
