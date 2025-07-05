// this code is simillar to the controller layer on springboot, and this is the one top layer
// of the back end on NodeJS, this is where you can specify all your endpoints, also, since we are running
// NodeJS, most of the time we'll have to serve the static public files 
// the reason I did this, is because I do not know how to work with ReactJS
// so I created endpoints to send html data and css data, I tried doing that with JS 
// to call the fecth functions, It failed. lel skill issue XD

const path = require('path');
const express = require('express')
const router = express.Router()
const { registerUser, login, checkLoggedIn } = require('../controllers/controller')

router.get('/', (req, res) =>{
    // if you don't have an html file, you can send a string, to do quick test
    //res.send('hello from nodeJS') 
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

router.get('/secret', checkLoggedIn, (req,res) =>{
    //res.send('this is a restricted area!, only admins can access this site')
    res.sendFile(path.join(__dirname, '../public', 'secret.html'))
})

router.get('/style', (req,res)=>{
    res.sendFile(path.join(__dirname, '../public', 'style.css'))
})


// REST APIs
router.post('/api/register', registerUser)
router.post('/api/login', login)


module.exports = router;