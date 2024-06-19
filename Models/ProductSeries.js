const moongose = require("mongoose");

const ProductSeries = new moongose.Schema({ 
     serie_name:{type:String, required:true},
     serie_subcategorie:{type:String, required:true},
     serie_registerDate:{type:Date, required:true, default:Date.now},
});

module.exports = moongose.model("ProductSeries", ProductSeries);