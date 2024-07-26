const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

 
// Define a schema for the User collection
const userSchema = new mongoose.Schema({
  username: String,
  charge:String,
  email: String,
  picture:String,
  phone:String,
  password: String
});


async function GetUser(req, res, next) {
  let Item;
  try {
      Item = await userSchema.findById({ email: req.session.user }); 
      if (Item === null) return res.status(404).json({ message: "Cannot find user" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
  res.cruser = Item;
  next();
}
 

// Create a User model based on the schema
const User = mongoose.model('Users', userSchema);
 
// Middleware for JWT validation
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

// Route to register a new user
async function RegisterUser(req, res){
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já existe' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Route to authenticate and log in a user
async function Login (req, res){
  try {
    // Check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais Invalidas !' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciais Invalidas !' });
    }
    req.session.user = req.body.email;
    let dt =   req.session.user 
    // Generate JWT token
    const token = jwt.sign({ email: dt, status:"ok" }, 'secret');
    res.status(200).json({ token , dt});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Protected route to get user details
async function UserDetails(req, res) {
  try {
    // Fetch user details using decoded token
    const user = await User.findOne({ email: req.session.user });
    if (!user) {
        return res.status(404).json({ msg: 'User not founded !',sesseion:req.session });
    }
    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
 
async function GetUserDetails(req, res) { 
  try {
    // Fetch user details using decoded token
    const user = await User.findOne({ email: req.session.user });
    if (!user) {
         return res.status(404).json({ msg: 'User not founded !',ss:req.session });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
 

async function Getusers(req, res) {
  try {
    // Fetch user details using decoded token
    const users = await User.find(); 
    res.status(200).json(users);
    
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};




async function UpdateUserData(req, res) {
  try {
   let currentUser = req.session.user; 
    if(currentUser.trim().toLowerCase() !==  req.body.email){
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ msg: 'Email já existe' });
      }
    } else {
      const existingUser = await User.findOne({ email: req.session.user })
      let  UpdateCrUserData = existingUser;

      UpdateCrUserData.username = req.body.username;
      UpdateCrUserData.email = req.body.email;
      UpdateCrUserData.phone = req.body.phone;
      UpdateCrUserData.charge = req.body.charge;  

      const updated =  await UpdateCrUserData.save();
      return res.status(201).json(updated); 
    } 
  } catch (error) { 
    console.log(error)
    return res.status(500).json({ error: error });
  }
};


async function UpdateUserPassword(req, res) {
  try {
    const existingUser = await User.findOne({ email: req.session.user })
    if (!existingUser) {
      return res.status(401).json({ error: 'Conta não encomtrada !' });
    }
    let  UpdatedPassword = existingUser;
    
    const passwordMatch = await bcrypt.compare(req.body.current_password, existingUser.password); 
   if (passwordMatch) { 
    const hashedPassword = await bcrypt.hash(req.body.new_password, 10);
    UpdatedPassword.password = hashedPassword;
     const updated =  await UpdatedPassword.save();
     return res.status(201).json(updated);
   } else {
    return res.status(500).json({ msg: 'A password atual está errada , digite novamente !'});
   }
  } catch (error) {
    console.log("Lets sho you errors !")
    console.log(error)
    return res.status(500).json({ error:error});
  }
};

 


async function LogoutFromAccount(req, res) {
  try {
    req.session.destroy();
    res.status(200).json("Loggout !"); 
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



 


module.exports = { verifyToken, LogoutFromAccount, UpdateUserPassword, RegisterUser, GetUser, UpdateUserData, Login, UserDetails, GetUserDetails, Getusers };
 

 
