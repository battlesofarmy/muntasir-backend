const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    id : {type:Number, required : true },
    name : {type:String, required : true }
});

const StudentModel = mongoose.model('Student', studentSchema);

module.exports = StudentModel;