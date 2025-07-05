// if you've worked with springboot before, this is similar to the DAO layer
// this is where you can write your SQL queries
const pool = require('../db');

// this function inserts data ito the users table,
// the hashed password is handled in the controller.js code
// and it passes trought here as an argunent
async function createUser(username, password) {
  const [result] = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)',[username, password]);

  return result.insertId;
}

// this function will try to find the username from the argument
// if it finds it, return the object from the SQL query, if it doesn't return null
async function getUser(username){
  try {
    const [results] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (results.length === 0) {
      return null;
    }
    // Return the user object
    return results[0]; 
    
  } 
  
  catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser
};


