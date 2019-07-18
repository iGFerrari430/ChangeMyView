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

    content: {
        type: String,
        required: true
    },

    argument: {
        type: []
    }

})

const Proposition = mongoose.model("Proposition", propoSchema)

module.exports = Proposition