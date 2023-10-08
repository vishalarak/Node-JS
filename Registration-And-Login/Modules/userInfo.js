const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name :{
        type : String,
        default : ""
    },
    email :{
        type : String,
        unique : true,
        lowercase : true,
        default : ""
    },
    password :{
        type : String,
        default : ""
    }
});

const User = mongoose.model("userData", UserSchema, "userRec");
module.exports = User;