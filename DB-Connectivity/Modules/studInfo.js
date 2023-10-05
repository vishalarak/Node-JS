const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollNo : {
        type : Number,
        default : 0
    },
    name : {
        type : String
    },
    marks : {
        type : Number
    },
});


const Student = mongoose.model('studData',studentSchema,'studRec');
module.exports = Student;