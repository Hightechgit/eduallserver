const ProductsSchema = require("../Models/Products");
const CartProductsSchema = require("../Models/CartProducts");
const FilesSchema = require("../Models/FilesModel");
const nodeMailer = require("nodemailer");


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
    let userid = req.session.user;
    Item = await CartProductsSchema.find({cart_product_prid: req.body.product_id,  cart_product_user: userid});
    if (Item !== null) {
      if(userid !== null && userid !== undefined) {
        const Inputs = new CartProductsSchema({
          cart_product_prid: req.body.product_id,
          cart_product_ammount:req.body.product_ammount,
          cart_product_user: userid
        });
        const newProduct = await Inputs.save();
        return res.status(201).json(newProduct);
    } else {
      return res.status(500).json({ msg: "Este produto já existe no carrinho !", error: error });
    }
    } else {
      return res.status(500).json({ msg: "Precisa fazer login para adicionar o produto no carrinho !", error: error });
    }
  } catch (error) {
    res.status(500).json({ msg: "Lamentamos occoreu um erro ao adicionar o produto no carrinho !", error: error });
  }
}

const GetProductsFromCart = async (req, res) => {
  try {
    let userid = req.session.user;

    let ProductsFromCartRows = await CartProductsSchema.find({ cart_product_user: userid });  // getting all user products added to cart
    let ProductsRows = await ProductsSchema.find();  // getting all products from product table
    let Images = await FilesSchema.find();  // getting all images from images table
    res.status(200).json({ d1: ProductsRows, d2: Images, d3: ProductsFromCartRows });   // sending all the the data that we picked to frontend
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Error while trying to delete the product !", error: error });
  }
}

const updateProductAmountFromCart = async (req, res) => {
  let UpdatedProductFromCart = res.item;
  UpdatedProductFromCart.cart_product_ammount = req.body.ammount;
  try {
    const updated = await UpdatedProductFromCart.save();
    res.status(201).json(updated);
  } catch (error) {
    res.status(500).json({ msg: "Error while updating the product", error: error });
  }
}

const sendProductOrder = async (req, res) => {
  let userid = req.session.user;
  try {
    const user = await User.findOne({ email: userid });
    if (!user) return res.status(404).json({ error: 'User not founded !' });
    let ProductsFromCartRows = await CartProductsSchema.find({ cart_product_user: userid });  // getting all user products added to cart
    let ProductsRows = await ProductsSchema.find();  // getting all products from product table

    let Output = [];
    ProductsRows.forEach(cartItem => {
      for (let i = 0; i < ProductsFromCartRows.length; i++) {
        if (cartItem._id === ProductsFromCartRows[i].cart_product_prid) {
          Output.push({
            product_id: cartItem._id,
            product_name: cartItem.product_name,
            product_price_1: cartItem.product_price,
            product_price_2: cartItem.product_oldprice,
            product_ammount: ProductsFromCartRows[i].cart_product_ammount,
          });
        }
      }
    });

    const Sender = user.email;
    const Title = "Encomenda de produtos - Htmarkt " + " ( " + user.username + " )";
    const EmailMessage = ` 
        <!DOCTYPE html>
        <html lang="pt">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">  
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        <style>

        

        html, body{   
        font-family: "Poppins", sans-serif;
        text-decoration: none; 
        font-weight:550;
        box-sizing: border-box;
        margin:0px;
        padding:0px;
        }


        .btn {
        font-size: 14px;
        padding: 6px 12px;
        margin-bottom: 0;

        display: inline-block;
        text-decoration: none;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-image: none;
        border: 1px solid transparent;
        }
        .btn:focus,
        .btn:active:focus {
        outline: thin dotted;
        outline: 5px auto -webkit-focus-ring-color;
        outline-offset: -2px;
        }
        .btn:hover,
        .btn:focus {
        color: #333;
        text-decoration: none;
        }
        .btn:active {
        background-image: none;
        outline: 0;
        -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
        }


        .btn-default {
        color: #333;
        background-color: #fff;
        border-color: #ccc;
        }
        .btn-default:focus {
        color: #333;
        background-color: #e6e6e6;
        border-color: #8c8c8c;
        }
        .btn-default:hover {
        color: #333;
        background-color: #e6e6e6;
        border-color: #adadad;
        }
        .btn-default:active {
        color: #333;
        background-color: #e6e6e6;
        border-color: #adadad;
        }


        strong, h6, span,  h2, h1, div{
        font-size:15px;
        } 

        .btn.bg-black:hover{
        background-color:var(--k-main) !important;
        }

        div .slick-arrow{
        z-index:500 !important;
        } 

        .btn.bg-main:hover{
        background-color:black !important;
        }

        .wrapper{
        width:100%;
        max-width:1500px;
        padding:0px 20px;
        }


        a{
        text-decoration: none;
        }

        .center{
        display:flex;
        align-items: center;
        justify-content: center; 
        text-align: center;
        }

        .empty-area {
        margin-top:50px;
        }


        .empty-area img {
        max-width:300px;
        margin:30px 0px;
        }

        .empty-area h1{
        font-size:30px;
        max-width:600px;
        font-weight:bold;    
        }



        .space{
        display: flex;
        justify-content: space-between;
        width:100%;
        }

        .flex{
        display: flex;
        align-items: center;
        }

        .react-multiple-carousel__arrow{
        z-index:500 !important;
        }


        .avatar-pic{
        width:60px;
        height:60px;
        min-width:60px;
        border-radius:100%;
        object-fit: cover;
        border:3px solid var(--k-main);
        background-color:var(--k-main);
        }



        .header .top{
        width:100%;
        padding:10px 20px;
        background:var(--white);
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin:0;
        }
        .header .top p{
        text-transform: uppercase;
        font-size:15px;
        }

        .header .top p,
        .header ul {
        margin:0;
        padding:0;
        }


        .header .top .fa{
        color:var(--k-big-dark);
        margin:0;
        padding:0;
        margin-left:8px;
        margin-top:-3px;
        }

        .header .ac{
        display: flex;
        align-items: center;
        }

        .header .ac li{
        margin-left:0;
        }

        .loader{
        display: none !important;
        }

        .header .top li{
        margin:0 7px;
        }

        .header li a{
        color:var(--k-big-dark);
        }


        .bold-title{
        font-size:22px;
        font-weight:bold;
        }

        li{
        list-style: none;
        }


        .lang img{
        width:25px;
        height:22px;
        } 

        .lang {
        position: relative; 
        }


        .lang .active{
        cursor: pointer;
        }

        .lang ul{
        position: absolute;
        top:26px;
        width:150px;
        height:140px; 
        background:var(--k-light);
        z-index:1000;
        box-shadow:0 3px 10px rgba(0,0,0, 0.1);
        padding:4px;
        display: none; 
        }


        .lang  ul li {
        font-size:14px;
        color:var(--grey); 
        padding-bottom:10px;
        text-transform: uppercase;
        }


        .lang:hover ul{
        display: block; 
        }


        .lang ul li  img{
        margin-right:10px;
        width:20px;
        height:20px;
        }


        .bg-main{
        background: var(--k-main);
        }


        .bg-black{
        background:var(--k-big-dark) !important;
        }


        .btn.bg-main{
        color:var(--white) !important;
        }

        .btn.bg-black{
        color:var(--k-light);
        }

        .btn{
        padding:12px 14px;
        font-size:15px !important;
        margin:0 6px;
        font-weight:500;
        }

        .btn.bg-main{
        color:var(--k-big-dark);
        font-weight:500;
        }

        .logo{
        font-size:30px;
        font-weight: 600;
        display: flex;
        align-items: center;
        color: var(--k-big-dark);
        }

        .logo svg{
        color:var(--k-main);
        margin-right:10px;
        width:60px;
        height:60px;
        fill:var(--k-main);
        }


        .logo a {
        color:var(--dark);
        }

        .logo i{
        margin:0px;
        color:var(--k-main);
        margin-right:10px;
        font-size:40px;
        }


        /* MailBox */

        .mailer-box{
        max-width:700px; 
        width:100%;
        border:1px solid silver;
        border-bottom: none;
        background-color:red !important;
        font-family: "Montserrat", sans-serif !important;
        text-decoration: none; 
        font-weight:550;
        }

        .mailer-box .mail-header{ 
        width:100%;
        min-height:100px;
        background:rgb(203, 2, 2);
        padding:20px;
        display: block;
        color:#ffff;
        }

        .mailer-box .line{  
          width:100%;
          height:1px;
          background-color: rgb(224, 224, 224);
          margin-top:20px;
        }


        .mailer-box .mail-header h6{ 
        display: flex;
        align-items: center;
        font-weight: bold;
        margin:0px;
        }

        .mailer-box .mail-header  .nm{ 
        color:black;
        margin-left:10px; 
        }

        .mailer-box .content { 
        padding:20px;
        min-height:400px;
        width:100%;
        background:#ffff;
        }


        .mailer-box .mail-header h1{ 
        font-size:25px !important;
        margin:0px; 
        font-weight:bold;
        margin-bottom:10px;
        }

        .mailer-box .mail-header .small{ 
          margin-top:10px;
        }

        .mailer-box .sp{ 
        color: #da1616 !important;
        }

          
        .mailer-box .name{ 
        display: flex;
        flex-wrap: wrap;
        }

        .mailer-box .name{ 
        display: flex;
        flex-wrap: wrap;
        }


        .mailer-box .name .count{ 
        margin-right:10px;
        }


        .mailer-box .content .total{ 
        padding:10px 0px;
        border-top:2px dotted #da1616;
        border-bottom:2px dotted #da1616;
        }

        .mailer-box .content h1{ 
        font-size:18px;
        font-weight:bolder;
        }



        .mailer-box .m{ 
          margin:5px 0px !important;
        }

        .mailer-box .content .price, 
        .mailer-box .content .amount{ 
          margin:5px 0px !important;
        }

        .mailer-box .content .btn{ 
            margin:0px;
            margin-top:10px !important;
            background: #000;
            color:#ffff;
            border-radius:4px;
            cursor: pointer;
        }

        </style>
        </head>
        <body> 
        <div>
          <div class="mailer-box">
              <div class="mail-header">
                  <h1>Encomenda de produtos  - Htmarkt</h1>
                  <div class="block">
                      <h6>Solicitado por : <div class="nm">nome da pessoa aqui</div></h6>
                      <small>engenheiro de software na comprag</small>
                  </div>
              </div>
              <section class="content">
              

                <article>
                    <strong class='name'><div class="count">1 - </div>  nome do produto aqui </strong>
                    <div class="price m">Preço -   <strong class='sp'>3,000</strong></div>
                    <div class="amoun mt">Quantidade  - <strong class='sp'>3</strong> </div>  
                    <a target='_blank' href="#">
                      <button class="btn bg-dark text-light">ver produto na loja online</button>
                    </a>
                    <div class="line"></div>
                  <br>
                </article> 


                <div class="total">
                  <h1>Produtos encomendados  -  <strong class="sp">12</strong> </h1> 
                </div>

              </section>
              <div class="mail-footer"> 
              </div>
          </div>
        </div> 
        </body>
        </html> 
    `;

    if (Output.length > 0) {
      sendEmail(EmailMessageBody, Sender, Title);
      res.status(201).json("Order sent successfuly !");
    } else {
      res.status(500).json({ msg: "Error while sending the order !", error: error });
    }

  } catch (error) {
    res.status(500).json({ msg: "Error while sending the order !", error: error });
  }
}

module.exports = { sendEmail, RemoveProductFromCart, AddProductToCart, GetProductsFromCart, updateProductAmountFromCart, sendProductOrder }

