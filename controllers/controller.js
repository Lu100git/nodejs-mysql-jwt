// this code is almost similar as the controller layer on springboot, 
// think of this as the repository and part of the controllers code, the only difference is, on springboot,
// you'll have your endpoints on the controller layer, here on NodeJS it is recommended to handle
// the endpoints on the routes module, and handle the repository on the controller module, you'll know what I mean

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUser } = require('../model/user-model');

// bring the enviromental variables
require('dotenv').config()
//THAT FREAKING VARIABLE WAS AN ANOYING BUG, make sure to conver it into a number
const  SALT_ROUNDS = Number(process.env.SALT_ROUNDS)
const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY


// this function handles the process of user registration 
// it grabs the request body, then it hashes the password, before it gets registered 
// on the database 
async function registerUser(req, res) {
  const { username, password } = req.body;

  // check if the user gave a user name and password, otherwise send a 400 error
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // this is where the password hashes, then we call create user from the user-model.js module
  // if it successfully registers, send a 201
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const id = await createUser(username, hashedPassword)
    res.status(201).json({ id, username, "success":"user has been created"})
    console.log("user has been succesfully registered in the database")
  }

  // make sure the username column has unique values on mysql:
  // | username | varchar(40)  | YES  | UNI | NULL    |                |
  // otherwise users, will get duplicated 
  catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Username already exists' });
    }
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
}


// this function is what handles the login process, it uses bcrypt to hash the given password
// from the request body, and it compares to the hashed password in mysql, 
// this function also implements the Json Web Tokens, and the cookie session
async function login(req, res) {
  const { username, password } = req.body;

  // find the user in the database, if user is not found, return a 400
  try {
    const foundUser = await getUser(username);
    if (!foundUser) {
      return res.status(400).send("User not found");
    }

    // if user is found, compare the request body password, with the password on the database 
    const matches = await bcrypt.compare(password, foundUser.password);

    // if the password matches, then create a Json Web Token, store it in the cookie, and return the username 
    if (matches) {
      const token = jwt.sign({id:foundUser.id, username:foundUser.username}, SECRET_JWT_KEY, {expiresIn:'1h'})
      console.log('Access granted', foundUser.username)
      return res.cookie('access_token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV == 'production',
        sameSite:'strict',
        maxAge: 1000 * 60 * 60
      }).send({username:foundUser.username})
    }

    // if it doesn't matches, deny access
    else {
      return res.status(401).send("Access denied");
    }

  }
  // return a 500, if something happened during the login process,
  // posible cause, MySQL service is inactive, or there is a ghost in the machine 0.0 
  catch (error) {
    console.error("Login error:", error);
    return res.status(500).send("Internal Server Error");
  }
}

// this function will get the JWT from the cookie, if the token doesn't return a username
// it will be null, therefore it will ask to login, this function get's called, everytime
// some one tries to access the /secret endpoint
function checkLoggedIn(req, res, next){
  const token = req.cookies.access_token
  req.session = {username:null}

  try{
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session.username = data
  }catch{}

  const isLoggedIn = req.session.username

  if(isLoggedIn == null){
    return res.status(401).json({
      error:'you must be logged in'
    })
  }

  next()

}


module.exports = {
  registerUser,
  login,
  checkLoggedIn
};


