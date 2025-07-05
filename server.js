// this is the top layer of NodeJS, think of this as the file where the main function is located in springboot

const express = require('express')
const router = require('./routes/router')
const cookieParser = require('cookie-parser')
require('dotenv').config();

const PORT = process.env.PORT || 8080

const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.listen(PORT, ()=> {
    console.log(`listening on port: ${PORT}`)
})


