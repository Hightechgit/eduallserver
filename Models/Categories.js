const moongose = require("mongoose");

const ProductsCategories = new moongose.Schema({
    categorie_title:{type:String, required:true},
    categorie_registerDate:{type:Date, required:true, default:Date.now}  
});


module.exports = moongose.model("ProductsCategories", ProductsCategories);