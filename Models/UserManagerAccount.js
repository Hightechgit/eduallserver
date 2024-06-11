const moongose = require("mongoose");
//{ }
const  UserManager = new moongose.Schema({ 
    user_manager_name:{type:String, required:true},
    user_manager_email:{type:String, required:true},
    user_manager_password:{type:String, required:true},
    user_manager_token:{type:String, required:false},
    user_manager_registerDate:{type:Date, required:true, default:Date.now}
});


module.exports =  moongose.model("UserManagerAccount", UserManager);
