const mongoose = require("mongoose")

const historySchema = new mongoose.Schema({
    isFinished: {
        type: Date
    },
    propIndex: {
        type: Number
    },
    argIndex: {
        type: Number
    },
    tempHonor: {
        type: Number,
        default: 0
    },
    tempExpreience: {
        type: Number
    },
    topic_id: {
        type: String
    },
    listenRecorder:{
        type: [],
        default: [],
        required: true
    }
})

const History = mongoose.model("History", historySchema)

module.exports = History