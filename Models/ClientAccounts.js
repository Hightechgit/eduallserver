const moongose =  require("mongoose");


const ClientAccounts = new moongose.Schema({ 
    client_account_name:{type:String, required:true},
    client_account_email:{type:String, required:true},
    client_account_picture:{type:String, required:false},
    client_account_password:{type:String, required:false},
    client_account_type:{type:Number, required:true},
    client_account_phone:{type:Number, required:false },
    client_account_registerDate:{type:Date, required:true, default:Date.now}
});


module.exports = moongose.model("ClientAccounts", ClientAccounts);