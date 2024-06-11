const SubCategorieSchema = require("../Models/SubCategories");


async function GetSubCategories(req, res){
    try {
        let SubCategoriesList = await SubCategorieSchema.find();
        res.status(200).json(SubCategoriesList);
    } catch (error) {
       res.status(500).json({message:"Something went wrong while loading all subcategories", error:error});
    }
}

async function AddNewSubCategorie(req, res){
   const Inputs = new SubCategorieSchema({subcategorie_name:req.body.name, subcategorie_categorie:req.body.categorie});
   try {
       const newCategory = await Inputs.save();
       res.status(200).json(newCategory);
   } catch (error) {
       res.status(500).json({message:"Something went wrong while trying to add a new category !", error:error});
   }
}

async function UpdateSubCategorie(req, res) {
    let UpdateSubCategorie = res.subcategorie;
    UpdateSubCategorie.subcategorie_name = req.body.name;
    UpdateSubCategorie.subcategorie_categorie = req.body.categorie;

    try {
       const Updated = await UpdateSubCategorie.save();
       res.status(201).json(Updated);
    } catch (error) {
        res.status(500).json({ message:"Error while updating the Subcategorie", error:error});        
    }
}

async function DeleteSubCategorie(req, res){
   try {
       await res.subcategorie.deleteOne();
       res.status(201).json({message:"Subcategorie deleted successfuly"});
   } catch (error) {
       res.status(401).json({message:"Something went wrong while deleting this Subcategorie", error:error});
   }
}

module.exports = {GetSubCategories, AddNewSubCategorie, UpdateSubCategorie, DeleteSubCategorie};