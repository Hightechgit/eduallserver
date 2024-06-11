const SubCategorieSchema = require("../Models/SubCategories");


async function GetSubCategorie(req, res, next) {
    let subCat;
    try {
        subCat = await SubCategorieSchema.findById(req.params.id);
        if (subCat === null) return res.status(404).json({ message: "Cannot find subcategorie !" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
    res.subcategorie = subCat;
    next();
}

module.exports = GetSubCategorie;