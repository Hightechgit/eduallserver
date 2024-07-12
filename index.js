require("dotenv").config();
const express = require("express");
const moongose =  require("mongoose");
const bodyParser =  require("body-parser");
const session =  require("express-session"); 
const passport = require("passport");
const Router = require("./Routes/Index");
const ServerApp = express();
const cors = require("cors");


const DatabaseConnect  =  async()=>{
    moongose.connect("mongodb+srv://hightech:123HIJP99@cluster0.bkueuua.mongodb.net", 
    {useNewUrlParser:true}); 
    const Database = moongose.connection;
    try {
        Database.on("error", (error)=>{
           console.log("Something  went very wrong 1  - ", error);  
        });
        Database.once("open", ()=>{
            console.log("Well Done database connected kiosso  ....");
        });
    } catch (error) {
        console.log("Something  went very wrong 2  - ", error);  
    }
}
DatabaseConnect();

// allow request  methods on express server

ServerApp.use( function(req, res, next){ 
   res.setHeader("Access-Control-Allow-Origin", "https://htmarkt.hightech-airer.pt"); // This will allow our frontend to have access to the APIS 
   res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT", "PATCH", "DELETE");  // Allow commom action  methods 
   res.setHeader("Access-Control-Allow-Headers", "X-Request-With,content-type");
   res.setHeader("Access-Control-Allow-Credentials", true);
   next(); 
});

 

//  Making some extra configurations   like cookie and session  storage as well as some parsing and others
 
ServerApp.use(express.json());
ServerApp.use(session({secret:"HtmarketSession", cookie:{maxAge:24*60*60*1000}}));
ServerApp.use(passport.initialize());
ServerApp.use(passport.session());
ServerApp.use(bodyParser.urlencoded({extended:false})); 
ServerApp.use(bodyParser.json());
ServerApp.use(Router);
//ServerApp.use();


ServerApp.listen();
