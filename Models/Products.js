const moongose = require("mongoose");

const ProductSchema =  new moongose.Schema({ 
    product_name:{type:String, required:true},
    product_price:{type:Number, required:false},
    product_oldprice:{type:Number, required:false},
    product_description:{type:String, required:false},
    product_categorie:{type:String, required:true},
    product_subcategorie:{type:String, required:false},
    product_visitors:{type:Number, required:false},
    product_code:{type:Number, required:false},
    product_registerDate:{type:Date, required:true, default:Date.now},
    product_stockAmount:{type:Number, required:false},
    product_brand:{type:String, required:false}, 
    product_serie:{type:String, required:false}, 
});

module.exports =  moongose.model("Products", ProductSchema);