const mongoose = require("mongoose")
const Comment = require("./comment")

const argumentSchema = new mongoose.Schema({
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

    title: {
        type: String,
        required: true
    },

    plainTextContent: {
        type: String,
        required: true
    },

    richTextContent: {
        type: String,
        required: true
    },

    comment: {
        type: [],
        default: []
    }

})

const Argument = mongoose.model("Argument", argumentSchema)

module.exports = Argument