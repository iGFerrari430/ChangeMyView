const mongoose = require("mongoose")
const Argu = require("./argument")

const propoSchema = new mongoose.Schema({
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

    richTextContent: {
        type: String,
        required: true
    },

    plainTextContent: {
        type: String,
        required: true
    },

    argument: {
        type: [],
        default: []
    }

})

const Proposition = mongoose.model("Proposition", propoSchema)

module.exports = Proposition