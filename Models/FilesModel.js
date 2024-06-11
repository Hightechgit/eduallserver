const  moongose = require("mongoose");

const Files = new moongose.Schema({
      file_name:{type:String, required:true},
      file_product_code:{type:String, required:true},
      file_registerDate:{type:String, required:true, default:Date.now}, 
});


module.exports = moongose.model("ProductFiles", Files);