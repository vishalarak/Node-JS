const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollNo : {
        type : Number,
        default : 0
    },
    name : {
        type : String,
        default : ""
    },
    marks : {
        type : Number,
        default :0
    },
});


const Student = mongoose.model('studData',studentSchema,'studRec');
module.exports = Student;