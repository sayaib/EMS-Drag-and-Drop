const mongoose = require('mongoose');

//Create log schema for collection document
const logSchema = new mongoose.Schema({
    dateTime:{
        type: String,
    },
    message: {
        type: String,
    }
})

//Here crete Log collection for storing logs of user documents.
const Log = new mongoose.model("Logs", logSchema);

module.exports = Log;