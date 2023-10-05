// with the help of express you dont need to add http it will automatically added.

var express = require('express');
var app = express();

// importing studModule file
var stud = require('./studModule');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/Images', express.static(__dirname + '/Images'));


app.get("/", function(req,res){
    res.sendFile("D:/Bitcode/Node js/Demo Project/Client/Student.html");
    // res.write("It's Home Page!!");
    // res.end();
});
// for showing all records in tabular format
app.get("/studData/students", function (req, res) {
    const arr = stud.getList();
    res.send(arr);
});
// using queryString (in this join with "?" using your req.query key in this we use "studRollno")
app.get("/studData/searchStud/",function(req,res){
    var x = req.query.studRollno;
    console.log(x);
    var obj = stud.getStudent(x);
    let str1 = "<br>RollNo = " +  obj.rollno + "<br>Name = " + obj.name;
    res.write(str1);
    res.end();
});
//using request parameter (you can add as parameters as you want just saparate them using ":")
app.get("/studData/searchStud/:rno", function(req,res){
    var x = req.params.rno;
    console.log(x);
    var obj = stud.getStudent(x);
    let str1 = "<br>RollNo = " +  obj.rollno + "<br>Name = " + obj.name;
    res.write(str1);
    res.end();
});
app.post("/studData/insertStudent", function(req,res){
    let rno = req.body.studRollno;
    let studName = req.body.studName;
    var msg = stud.setStudent(rno,studName);
    res.write(msg);
    res.end();
});
app.put("/studData/UpdateStud/:rno", function(req,res){
    let rno = req.params.rno;
    let str = req.body.studName;
    console.log(rno,str);
    let msg = stud.updateStudent(rno,str);
    res.write(msg);
    res.end();
});
app.delete("/studData/DeleteStud/:rno", function(req,res){
    let rno = req.params.rno;
    let msg = stud.deleteStudent(rno);
    res.write(msg);
    res.end();
});
app.get("/studData/studResult", function(req,res){
    let ipClass = req.query.resClass;
    let resArr = stud.getResult(ipClass);
    res.json(JSON.stringify(resArr));
    res.end();
});
app.get("/studData/sortStud", function(req,res){
    var arr = stud.sortStud();
    res.json(JSON.stringify(arr));
    res.end();
});
app.listen(3000, function(){
    console.log("Server Started on port 3000...");
});