 const express = require("express");
const { ShowAllProducts, AddNewProduct, uploadImageFile, DeleteProduct, ShowSingleProduct, UpdateProduct } = require("../Controllers/ProductsController");
const GetProduct = require("../Middlewares/GetProduct");
const { GetCategories, AddNewCategorie } = require("../Controllers/CategoriesController");
const { AddNewSubCategorie } = require("../Controllers/SubCategoriesController");
 const {AddNewProductSerie, ShowAllProductsSeriesBySubCategorie, DeleteProductSerie} = require("../Controllers/ProductSeriesController");
 const Router = express.Router();




 Router.get("/htmarketgetallproducts/", ShowAllProducts);
 Router.post("/htmarketregisternewproduct/", AddNewProduct);
 Router.delete("/htmarketdeleteproduct/:id", GetProduct,  DeleteProduct);
 Router.get("/htmarketgetsingleproduct/:id", GetProduct,  ShowSingleProduct);
 Router.put("/htmarketupdateproduct/:id", GetProduct,  UpdateProduct);
 Router.post("/htmarketuploadimages/", uploadImageFile);


 Router.get("/htmarketgetallcategories/",  GetCategories);
 Router.post("/htmarketregisternewcategorie/", AddNewCategorie);
 Router.post("/htmarketregisternewsubcategorie/", AddNewSubCategorie)


 Router.get("/htmarketgetallproductsseriesbysub/:id", ShowAllProductsSeriesBySubCategorie);
 Router.post("/htmarketregisternewproductserie/", AddNewProductSerie);
 Router.delete("/htmarketdeleteproductserie/:id", GetProduct,  DeleteProductSerie);




 module.exports = Router;