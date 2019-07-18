const mongoose = require("mongoose")
const proposition = require("./proposition")

const topicSchema = new mongoose.Schema({
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

    title: {
        type: String,
        required: true,
        lowercase: true
    },

    postDate: {
        type: Date,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true
    },

    Hotness: {
        type: Number,
        required: true,
        default: 0
    },

    proposition: {
        type: [],
        required: true,
    },

})

const Topic = mongoose.model("Topic", topicSchema)

module.exports = Topic