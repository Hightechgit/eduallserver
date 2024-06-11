const moongose = require("mongoose");
 
const ProductsOnCart =  new moongose.Schema({ 
    cart_product_user:{type:String, required:true},
    cart_product_prid:{type:String,required:true},
    cart_product_ammount:{type:Number, required:true},
    cart_product_addedDate:{type:Date, required:true, default:Date.now},
})

module.exports = moongose.model("ProductsOnCart", ProductsOnCart);