const moongose  = require("mongoose");


const SliderItems =  new  moongose({ 
     slider_item_product:{type:String, required:true},
     slider_item_image:{type:String, required:false},
     slider_item_registerDate:{type:Date, required:true, default:Date.now}
});

module.exports = moongose.model("ProductsOnSlider", SliderItems);