require("dotenv").config();
const express = require("express");
const moongose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require("passport");
const Router = require("./Routes/Index");
const ServerApp = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');


const DatabaseConnect = async () => {
    moongose.connect("mongodb+srv://hightech:123HIJP99@cluster0.bkueuua.mongodb.net",
        { useNewUrlParser: true });
    const Database = moongose.connection;
    try {
        Database.on("error", (error) => {
            console.log("Something  went very wrong 1  - ", error);
        });
        Database.once("open", () => {
            console.log("Well Done database connected   ....");
        });
    } catch (error) {
        console.log("Something  went very wrong 2  - ", error);
    }
}
DatabaseConnect();

const allowedDomains = ['http://localhost:3000', 'http://localhost:3001', 'https://htmarkt.hightech-airer.pt', "https://hightech-airer.pt"]; 
 ServerApp.use(cors({credentials:true,  origin:allowedDomains, methods:'GET,POST,DELETE,PUT'}));

ServerApp.use(function (req, res, next) { 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true); 
    next();
});

 
const expiryDate = new Date(Date.now() + 24 * 60 * 60 * (1000*24*10))
 

ServerApp.use(session({ 
    secret:"HtmarketSession",
    resave:true,
    saveUninitialized:true, 
    maxAge:1000000*19,
    expires: 1000000*19,
    cookie: {
      //secure: true,
      //httpOnly: true, 
      expires: expiryDate      
    }
  })); 

ServerApp.use(express.json());
ServerApp.use(session({ secret: "HtmarketSession", cookie: { maxAge: 24 * 60 * 60 * 1000 } }));
ServerApp.use(passport.initialize());
ServerApp.use(passport.session());
ServerApp.use(bodyParser.urlencoded({ extended: false }));
ServerApp.use(bodyParser.json()); 
ServerApp.use(cookieParser()); 
ServerApp.use(Router);

ServerApp.listen(6500, () => {
    console.log("Server is running without  issues ...")
});
 

 
 

 

 