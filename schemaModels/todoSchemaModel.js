const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    email : {type: String, required: true},
    todo : {type: String, required: true},
},{versionKey: false});

const ToDo = mongoose.model("Todo", todoSchema);
module.exports = ToDo;