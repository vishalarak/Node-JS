var express = require("express");

var router = express.Router();
router.use(express.json());

const cors = require('cors');
router.use(cors());

router.use(
  express.urlencoded({
    extended: true,
  })
);

const mongoose = require("mongoose");
const stud = require("../Modules/studInfo");
const Student = require("../Modules/studInfo");

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = "mongodb://127.0.0.1:27017/testDB";
db.stud = stud;
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!!");
  })
  .catch((err) => {
    console.log("Cannot connnect to the Database!!", err);
    process.exit();
  });

router.get("/home", function (req, res) {
  res.send("it's Home Page!!!");
  res.end();
});

router.post("/insertStud", async (req, res) => {
  var data = req.body;
  var s1 = new Student(data);
  try {
    x = await s1.save();
    res.send(x);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.get("/getAllStud", async (req, res) => {
  const user = await Student.find().select({
    rollNo: 1,
    name: 1,
    marks: 1,
    _id: 0,
  });
  if (!user) {
    res.status(404).send({ message: "there are no records!!!" });
  }
  if (user) {
    res.json({ rec: JSON.stringify(user)});
  }
});

router.put("/updateStud/:rno", async (req, res) => {
  let rno = req.params.rno;
  let mks = req.body.marks;

  try {
    await Student.findOneAndUpdate({ rollNo: rno }, { marks: mks });
    res.send("Record updated!!!");
  } catch (e) {
    res.send(e);
  }
});

router.delete("/deleteStud/:rno", async (req, res) => {
  let rno = req.params.rno;
  try {
    s = await Student.findOneAndDelete({ rollNo: rno });
    res.send("Record deleted!!!");
  } catch (e) {
    res.send(e);
  }
});

router.get("/searchStud/:mks", async (req, res) => {
  let mks = parseInt(req.params.mks);
  console.log(typeof(mks));
  // try {
    data = await Student.find({ marks: mks }).select({_id : 0});
    console.log(data);
    res.send(data);
  // } catch (e) {
    // res.send(e);
  // }
});

module.exports = router;
