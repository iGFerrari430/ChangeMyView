const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
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

    postDate: {
        type: Date,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    numLike: {
        type: Number,
        required: true,
        default: 0
    }

})

const Comment = mongoose.model("comment", commentSchema)

module.exports = Comment