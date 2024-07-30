///  [ ]    { }
const ProductsSchema = require("../Models/Products");
const FilesSchema = require("../Models/FilesModel");
const  multer = require(`multer`);  
const stream = require("stream");   
const { google } = require("googleapis");  
const CategorieSchema = require("../Models/Categories"); 
const ProductSeriesSchema = require("../Models/ProductSeries");  
const SubCategorieSchema = require("../Models/SubCategories");



async function ShowAllProducts(req, res) {
    
    try {
        const Data = [];
        let ProductsRows = await ProductsSchema.find();
        let Images = await FilesSchema.find();  
 
        
        res.status(200).json({d1:ProductsRows, d2:Images});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong loading the data *", error: error });
    }
}



async function ShowAllElements(req, res) { 
    try {
        let cat = await CategorieSchema.find();
        let subcat = await SubCategorieSchema.find();
        let series = await ProductSeriesSchema.find();  
        res.status(200).json({series:series, subcategories:subcat, categories:cat});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong loading the data *", error: error });
    }
}




async function ShowSingleProduct(req, res) {
    try {
        let data = await FilesSchema.find({ file_product_code: res.product._id});
        let Categorie = await CategorieSchema.findById(res.product.product_categorie);
        if (data.length <= 0) data = [];
        res.status(200).json({ content: res.product, images: data, categorie:Categorie});
    } catch (error) {
        res.status(500).json({ message: "Errro while loading single product data", error: error });
    }
}

 

async function AddNewProduct(req, res) {
    console.log(req.body);
    const Inputs = new ProductsSchema({
        product_name: req.body.name, 
        product_price: req.body.price, 
        product_oldprice: req.body.oldprice, 
        product_description: req.body.description,
        product_categorie: req.body.category,
        product_code: req.subcategorie,
        product_code: req.body.code, 
        product_brand:req.body.brand,
        product_serie:req.body.serie,
        product_stockAmount: req.body.stockamount
    });

    try {
        const newProduct = await Inputs.save();
        res.status(201).json(newProduct);  
    } catch (error) {
        res.status(500).json({ message: "Error while adding new product", error: error });
    }
}

async function UpdateProduct(req, res) {
    let UpdatedProduct = res.product;
    UpdatedProduct.product_name = req.body.name;
    UpdatedProduct.product_price =  req.body.price;
    UpdatedProduct.product_description =  req.body.description;
    UpdatedProduct.product_oldprice =  req.body.oldprice;
    UpdatedProduct.product_categorie =  req.body.category;
    UpdatedProduct.product_code =  req.body.subcategorie;
    UpdatedProduct.product_stockAmount =  req.body.stockamount; 
    try {
        const updated =  await UpdatedProduct.save();
        res.status(201).json(updated);
    } catch (error) {
        res.status(500).json({message:"Error while updating the product", error:error});
    }
}


async function uploadImageFile(req, res){  
    
    /*
    const uploadFile = async(fileObject) => {
        
       const bufferStream = new stream.PassThrough();
       bufferStream.end(fileObject.buffer);
       try { 
          const { data } = await google.drive({ version: "v3", auth }).files.create({
             media: {
                 mimeType: fileObject.mimeType,
                 body: bufferStream,
             },
             requestBody: {
                 name: fileObject.originalname,
                 parents: ["1UBIcXC13aSlxZZ6Me_5JSVtpS5hGzYdz"],
             },
             fields: "id,name",
          });   
 
         console.log(data.id)
         let  Data = new FilesSchema({name:data.id, code:req.body.code})
         const newData = await Data.save();
         res.status(201).json(newData); 
 
       } catch (error) {
          res.status(500).json({message:error.message});
       }
    }; 
    
   const {files } = req;
   for (let f = 0; f < files.length; f += 1) {
      try {
          await uploadFile(files[f]); 
      } catch (error) { 
       res.status(500).json({message:error.message});
      }
    }   
    */

    try {
        let  Data = new FilesSchema({file_name:req.body.name, file_product_code:req.body.code})
         const newData = await Data.save();
         res.status(201).json(newData); 
    } catch (error) {
        res.status(500).json({errorge:error.message});
    }


}


async function DeleteProduct(req, res) {
    try {
        await res.product.deleteOne();
        res.status(200).json({message:"Product deleted successfuly !"});
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error while trying to delete the product !", error:error});
    }
}



async function DeleteProductImage(req, res) {
    try {
        await res.image.deleteOne();
        res.status(200).json({message:"image deleted successfuly !"});
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error while trying to delete the product !", error:error});
    }
}

 

module.exports = { ShowAllProducts,  ShowSingleProduct, DeleteProductImage, uploadImageFile ,ShowAllElements, AddNewProduct , UpdateProduct, DeleteProduct};