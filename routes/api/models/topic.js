const mongoose = require("mongoose")
const proposition = require("./proposition")

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    postDate: {
        type: Date,
        required: true,
    },

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

    richTextContent: {
        type: String,
        required: true
    },

    plainTextContent: {
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
        default: []
    },

})

const Topic = mongoose.model("Topic", topicSchema)

module.exports = Topic
