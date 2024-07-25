const ImageSchema = require("../Models/FilesModel"); 

async function GetProductImage(req, res, next) {
    let Item;
    try {
        Item = await ImageSchema.findById(req.params.id); 
        if (Item === null) return res.status(404).json({ message: "Cannot find image" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    res.image = Item;
    next();
}


module.exports = GetProductImage;