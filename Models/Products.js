const moongose = require("mongoose");

const ProductSchema =  new moongose.Schema({ 
    product_name:{type:String, required:true},
    product_price:{type:String, required:true},
    product_oldprice:{type:String, required:false},
    product_description:{type:String, required:false},
    product_categorie:{type:String, required:true},
    product_subcategorie:{type:String, required:false},
    product_visitors:{type:Number, required:false},
    product_code:{type:Number, required:false},
    product_registerDate:{type:Date, required:true, default:Date.now},
    product_stockAmount:{type:Number, required:false},
    product_Brand:{type:Number, required:false}, 
});

module.exports =  moongose.model("Products", ProductSchema);