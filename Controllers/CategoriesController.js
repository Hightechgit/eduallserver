///  [ ]    { }
const CategorieSchema = require("../Models/Categories"); 
const SubCategoriesSchema = require("../Models/SubCategories"); 

async function GetCategories(req, res){
    const Data = []; 
      try {
          let CategoriesList = await CategorieSchema.find();  
         for (let i = 0; i < CategoriesList.length; i++) { 
                let subcategoriesData = await SubCategoriesSchema.find({subcategorie_categorie:CategoriesList[i]._id});  
                Data.push({info: CategoriesList[i], subcategories:subcategoriesData}); 
         }
         res.status(200).json(Data); 
     } catch (err) {
        res.status(500).json({message:"Something went wrong while loading all categories", error:err});
     }
}

async function AddNewCategorie(req, res){
    const Inputs = new CategorieSchema({categorie_title:req.body.name});
    try {
        const newCategory = await Inputs.save();
        res.status(200).json(newCategory);
    } catch (error) {
        res.status(500).json({message:"Something went wrong while trying to add a new category !", error:error});
    }
}

async function UpdateCategorie(req, res) {
     let UpdateCategorie = res.categorie;
     UpdateCategorie.categorie_title = req.body.name;
     try {
        const Updated = await UpdateCategorie.save();
        res.status(201).json(Updated);
     } catch (error) {
         res.status(500).json({ message:"Error while updating the categorie", error:error});        
     }
}

async function DeleteCategorie(req, res){
    try {
        await res.categorie.deleteOne();
        res.status(201).json({message:"Categorie deleted successfuly"});
    } catch (error) {
        res.status(401).json({message:"Something went wrong while deleting this categorie", error:error});
    }
}

module.exports = {GetCategories, AddNewCategorie, UpdateCategorie, DeleteCategorie}; 

