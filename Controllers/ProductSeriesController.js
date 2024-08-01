const ProductSeriesSchema = require("../Models/ProductSeries"); 

async function ShowAllProductsSeriesBySubCategorie(req, res) { 
    try { 
       let Data = await ProductSeriesSchema.find(); 
        res.status(200).json(Data);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong loading the data ", error: error });
    }
}
 

async function AddNewProductSerie(req, res) {
    console.log(req.body);
    const Inputs = new ProductSeriesSchema({
        serie_name: req.body.name,  
        serie_subcategorie:req.body.subcategorie, 
    }); 
    try {
        const newProductSerie = await Inputs.save();
        res.status(201).json(newProductSerie);  
    } catch (error) {
        res.status(500).json({ message: "Error while adding new product serie", error: error });
    }
}
 
 
async function DeleteProductSerie(req, res) {
    try {
        await res.serie.deleteOne();
        res.status(200).json({message:"Product  serie deleted successfuly !"});
    } catch (error) {
        res.status(500).json({message:"Error while trying to delete the product serie !", error:error});
    }
}

module.exports = {AddNewProductSerie, ShowAllProductsSeriesBySubCategorie, DeleteProductSerie};
