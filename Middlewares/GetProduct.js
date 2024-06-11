const ProductsSchema = require("../Models/Products"); 

async function GetProduct(req, res, next) {
    let Item;
    try {
        Item = await ProductsSchema.findById(req.params.id);
        if (Item === null) return res.status(404).json({ message: "Cannot find product" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    res.product = Item;
    next();
}


module.exports = GetProduct;