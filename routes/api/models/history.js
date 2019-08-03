const mongoose = require("mongoose")

const historySchema = new mongoose.Schema({
    isFinished: {
        type: Boolean
    },
    propIndex: {
        type: Number
    },
    argIndex: {
        type: Number
    },
    tempHonor: {
        type: Number
    },
    tempExpreience: {
        type: Number
    },
    topic_id: {
        type: String
    }
})

const History = mongoose.model("History", historySchema)

module.exports = History