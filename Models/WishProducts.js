const moongose = require("mongoose");

const WishedProducts = new moongose({ 
    wished_product_user:{type:String, required:true},
    wished_product_prid:{type:String,required:true},
    wished_product_ammount:{type:Number, required:true},
    wished_product_addedDate:{type:Date, required:true, default:Date.now}, 
});


module.exports =  moongose.model("WishedProductsList", WishedProducts);