const express = require("express");
const app = express();

const router = express.Router();
router.use(express.json());

const cors = require("cors");
app.use(cors());

router.use(express.urlencoded({extended:true}));

const Product = require("../module/product");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = "mongodb://127.0.0.1:27017/ProductDB";
db.product = Product;
db.mongoose.connect(db.url,{
  useNewUrlParser : true,
  useUnifiedTopology : true  
})
.then(()=>{
    console.log("Database Connected!!!");
})
.catch((e)=>{
    console.log("Database not connected!!!");
});

router.get("/", (req,res)=>{
    res.send("It's Home page!!!");
});

router.post("/addProduct", async (req,res)=>{
    let data = req.body;
    let obj = new Product(data);

    try {
        x = await obj.save();
        res.send(x);
    } catch (e) {
        console.log(e);        
    }
});

router.get("/getAllProduct", async (req,res)=>{
    let prod = await Product.find().select({_id:0,__v:0});
    if(!prod){
        res.status(404).send({massage : "there are no records!!"});
    }
    if(prod){
        res.json({ProductRecord: JSON.stringify(prod)});
    }
});

router.put("/updateProduct/:prodName", async (req,res)=>{
    let prodName = req.params.prodName;
    let prodPrice = req.body.prodPrice;

    try {
        await Product.findOneAndUpdate({prodName:prodName},{prodPrice:prodPrice});
        res.send("Data updated!!!");
    } catch (e) {
        res.send(e);
    }
});

router.delete("/deleteProduct/:prodName", async (req,res)=>{
    let prodName = req.params.prodName;

    try {
        await Product.findOneAndDelete({prodName:prodName});
        res.send("Data deleted!!!");
    } catch (e) {
        res.send(e); 
    }
});

router.get("/getCategory", async (req,res) =>{
    let prod = await Product.find().select({category:1, _id:0});
    
    if(!prod){
        res.status(404).send({massage:"records not found!!"});
    }
    if(prod){
        res.json({ProductRecord : JSON.stringify(prod)});
    }
});

router.get("/getProductbyPrice", async(req,res) =>{
    let minPrice = req.params.minPrice;
    let maxPrice = req.params.maxPrice;

    x = await Product.find({prodPrice:{$gte:minPrice}, prodPrice:{$gt:maxPrice}}).select({prodName:1, prodPrice:1, category:1,_id:0});
    res.send(x);

})

module.exports = router;