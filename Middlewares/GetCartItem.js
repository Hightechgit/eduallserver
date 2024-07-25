const CartProductsSchema = require("../Models/CartProducts");

async function GetCartItem(req, res, next) {
    let Item;
    try {
        Item = await CartProductsSchema.findById(req.params.id);
        if (Item === null) console.log("product is null")
        if (Item === null) return res.status(404).json({ message: "Cannot find product from cart" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    res.item = Item;
    next();
}


module.exports = GetCartItem;