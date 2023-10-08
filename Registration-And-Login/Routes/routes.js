const express = require("express");

const router = express.Router();
router.use(express.json());

const cors = require("cors");
router.use(cors());

router.use(express.urlencoded({extended:true}));

const mongoose = require("mongoose");
const User = require("../Modules/userInfo");

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = "mongodb://127.0.0.1:27017/userDB";
db.user = User;
db.mongoose.connect(db.url,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => {
    console.log("Connected to the database!!");
})
.catch((err) => {
    console.log("Cannot connect to the database!!", err);
    process.exit();
});

router.get("/", (req,res) =>{
    res.send("It's Home page !!");
    res.end();
});

router.post("/registerUser", async (req,res) => {
    var data = req.body;
    var U1 = new User(data);
    try {
        x = await U1.save();
        res.send(x);
    } catch (e) {
        console.log(e);
        res.send(e);
    }
});

router.get("/getAllUsers", async (req,res)=>{
    const user = await User.find().select({name:1,email:1,password:1,_id:0});
    if(!user){
        res.status(404).send({massage:"there are no records!!"});
    }
    if(user){
        res.json({userRec : JSON.stringify(user)});
    }
});

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

        const user = await User.findOne({ email: email });
        if (user.password === password) {
            res.send("Login successful!!!");
        }
        else{
            res.send("invalid login details!!!")
        }    
});

module.exports = router;