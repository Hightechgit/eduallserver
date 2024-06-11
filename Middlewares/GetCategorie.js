const CategorieSchema = require("../Models/Categories");

async function GetCategory(req, res, next) {
    let Cat;
    try {
        Cat = await CategorieSchema.findById(req.params.id);
        if (Cat === null) return res.status(404).json({ message: "Cannot find product categorie !" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
    res.categorie = Cat;
    next();
}


module.exports = GetCategory;