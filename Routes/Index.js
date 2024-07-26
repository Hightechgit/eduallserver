const express = require("express");
const { ShowAllProducts, AddNewProduct, uploadImageFile, DeleteProduct, ShowSingleProduct, UpdateProduct, ShowAllElements, DeleteProductImage } = require("../Controllers/ProductsController");
const GetProduct = require("../Middlewares/GetProduct");
const { GetCategories, AddNewCategorie } = require("../Controllers/CategoriesController");
const { AddNewSubCategorie } = require("../Controllers/SubCategoriesController");
const { AddNewProductSerie, ShowAllProductsSeriesBySubCategorie, DeleteProductSerie } = require("../Controllers/ProductSeriesController");
const { verifyToken, UserDetails, Login, RegisterUser, GetUserDetails, Getusers, UpdateUserData, GetUser, LogoutFromAccount, UpdateUserPassword, sendProductOrder } = require("../Controllers/User");
const GetProductImage = require("../Middlewares/GetImage");
const { sendEmail, GetProductsFromCart, AddProductToCart, updateProductAmountFromCart, RemoveProductFromCart } = require("../Controllers/OrdersAndCart");
const GetCartItem = require("../Middlewares/GetCartItem");
const Router = express.Router();


Router.get("/", (req, res) => { res.json("Hi world !") });


Router.get("/allusers", Getusers); 
Router.get("/htmarketgetallproducts/", ShowAllProducts);
Router.post("/htmarketregisternewproduct/", AddNewProduct);
Router.post("/htmarketdeleteproduct/:id", GetProduct, DeleteProduct);
Router.post("/htmarketdeleteimage/:id", GetProductImage, DeleteProductImage);
Router.get("/htmarketgetsingleproduct/:id", GetProduct, ShowSingleProduct);
Router.post("/htmarketupdateproduct/:id", GetProduct, UpdateProduct);
Router.post("/htmarketuploadimages/", uploadImageFile);

Router.get("/htmarketgetallelements/", ShowAllElements);
Router.get("/htmarketgetallcategories/", GetCategories);
Router.post("/htmarketregisternewcategorie/", AddNewCategorie);
Router.post("/htmarketregisternewsubcategorie/", AddNewSubCategorie)

Router.get("/htmarketgetallproductsseriesbysub/:id", ShowAllProductsSeriesBySubCategorie);
Router.post("/htmarketregisternewproductserie/", AddNewProductSerie);
Router.delete("/htmarketdeleteproductserie/:id", GetProduct, DeleteProductSerie);

Router.get("/htmarketuseraccountdets/", verifyToken, UserDetails);
Router.post("/htmarketlogin/", Login);
Router.post("/htmarketlogout/", LogoutFromAccount);
Router.post("/htmarketuserregister", RegisterUser);
Router.get("/getcurrentuserdata", GetUserDetails);
Router.post("/updatecurrentuserdata", UpdateUserData);
Router.post("/updatecurrentuserpassword",  UpdateUserPassword); 


/* cart information  / newsletter */

Router.get("/getallproductsfromcart", GetProductsFromCart);
Router.post("/addnewproducttocart", AddProductToCart);
Router.delete("/removeproductfromcart/:id", GetCartItem,  RemoveProductFromCart);
Router.post("/updateproductammountfromcart/:id", GetCartItem, updateProductAmountFromCart);
Router.post("/sendproductfromcartasorder", sendProductOrder);

 
Router.post("/sendemailfornewsletter", async (req, res) => {
    try {
        sendEmail(`
        <html>
            <h1>Gostaria de receber novidades sobre a vossa empresa e produtos atraves do seguinte email :</h1>
            <strong style="color:red !important;font-size:18px;">${req.body.email_sender}</strong>
        </html> 
        ` , req.body.email_receiver, 
        "Solicitação de newsletter  - (Hightech-airer website / loja)");
        res.status(200).json("Data sent successfuly !");
    } catch (error) {
        res.status(500).json(error);
    }
});



Router.post("/ss", async (req, res) => {
    try { 
        req.session.input = req.body.code;
        console.log("session sent ....")
        res.status(200).json(req.session.input);
    } catch (error) {
        res.status(500).json(error);
    }
});

Router.get("/aa", async (req, res) => {
    try {  
        console.log(req.session)
        res.status(200).json(req.session.input);
    } catch (error) {
        res.status(500).json(error);
    }
}); 


module.exports = Router;