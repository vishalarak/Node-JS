var express = require("express");
var app = express();

const cors = require("cors");
app.use(cors());

var router = require("./Routes/routes");
app.use("/student", router);

/*
//ES6 fatArray function
function fun(){
    this.name = "Bitcode";
    this.getName = function(){
        self = this;
        setTimeout(function(){
            console.log("timeout = " + self.name);
        },1000);
        console.log("outside = " + this.name);
    }
}

new fun().getName();

function add(a,b){
    console.log(a+b);
}

var add = (a,b) => {
    console.log(a+b);
}

add(10,20);
*/
app.listen(3000, function () {
  console.log("Server started on port 3000...");
});
