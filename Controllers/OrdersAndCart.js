const ProductsSchema = require("../Models/Products");
const CartProductsSchema = require("../Models/CartProducts");
const FilesSchema = require("../Models/FilesModel");
const nodeMailer = require("nodemailer");
const { userSchema } = require("./User");
var store = require('store'); 

const sendEmail = async (messageBody, receiver, title) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: "geral.hightech@gmail.com", pass: "aszrcxudypdkdtwy" },
      tls: { rejectUnauthorized: false }
    });
    await transporter.sendMail({
      from: "geral.hightech@gmail.com",
      to: [receiver],
      subject: title !== null ? title : "Mensagem da Loja online - Htmarkt",
      html: messageBody !== null ? messageBody : `  `
    });
    console.log("Done....")
    return true;
  } catch (error) {
    console.clear()
    console.log(error);
    return false;
  }
}


const RemoveProductFromCart = async (req, res) => {
  try {
    await res.item.deleteOne();
    res.status(200).json({ msg: "Product deleted from cart successfuly !" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Error while trying to delete the product from cart !", error: error });
  }
}

const AddProductToCart = async (req, res) => {
  try {
    let userid =  req.params.email;
    Item = await CartProductsSchema.findOne({cart_product_prid: req.body.product_id,  cart_product_user: userid});  
      if(userid !== null && userid !== undefined) {
        if (Item === null) {
          const Inputs = new CartProductsSchema({
            cart_product_prid: req.body.product_id,
            cart_product_ammount:Math.floor(req.body.product_ammount),
            cart_product_user: userid
          });
          const newProduct = await Inputs.save();
          return res.status(201).json(newProduct);
        } else {
          return res.status(500).json({ msg: "Este produto já foi adicionado ao carrinho !"});     
        }
         
    } else {
      return res.status(500).json({ msg: "Precisa fazer login para adicionar este produto no carrinho !"});
    } 
  } catch (error) { 
    res.status(500).json({ msg: "Lamentamos occoreu um erro ao adicionar o produto no carrinho !"});
  }
}

const GetProductsFromCart = async (req, res) => {
  try {
    let userid =  req.params.email;

    let ProductsFromCartRows = await CartProductsSchema.find({ cart_product_user: userid });  // getting all user products added to cart
    let ProductsRows = await ProductsSchema.find();  // getting all products from product table
    let Images = await FilesSchema.find();  // getting all images from images table
    res.status(200).json({ d1: ProductsRows, d2: Images, d3: ProductsFromCartRows });   // sending all the the data that we picked to frontend
  } catch (error) { 
    res.status(500).json({ msg: "Error while trying to delete the product !", error: error });
  }
}

const updateProductAmountFromCart = async (req, res) => {
  let UpdatedProductFromCart = res.item;
  UpdatedProductFromCart.cart_product_ammount = req.body.cart_ammount;
  try {
    const updated = await UpdatedProductFromCart.save();
    res.status(201).json(updated);
  } catch (error) {
    res.status(500).json({ msg: "Error while updating the product", error: error });
  }
}

 
module.exports = { sendEmail, RemoveProductFromCart, AddProductToCart, GetProductsFromCart, updateProductAmountFromCart }

