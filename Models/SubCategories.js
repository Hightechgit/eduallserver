const moongose = require("mongoose");

const ProductSubCategories = new moongose.Schema({ 
     subcategorie_name:{type:String, required:true},
     subcategorie_categorie:{type:String, required:true},
     subcategorie_registerDate:{type:Date, required:true, default:Date.now}
});

module.exports = moongose.model("ProductSubCategories", ProductSubCategories);