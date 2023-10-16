const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    prodName : {
        type : String,
        default : "",
        require : true
    },

    prodPrice : {
        type : Number,
        default : 0,
        require : true
    },

    category : {
        type : String,
        default : ""
    }
});

const Product = mongoose.model("ProductData", productSchema,"ProductRecord");
module.exports = Product;