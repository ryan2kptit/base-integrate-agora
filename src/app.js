require('dotenv').config()
const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const routes = require('./routes')
const app = express();

//init middlewares
app.use(morgan("dev"))       // use for development
// app.use(morgan("combined"))  // use for production
app.use(helmet())               
app.use(compression())          // compress data response

// add body-parser
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


// init db
require('./dbs/init.mongodb')

const { checkOverLoad } = require('./helpers/check.connect')
// checkOverLoad()



// init routes
app.use('/api/v1', routes)

app.get('/', (req, res, next) => {
    const strCompress = 'Ayo nigga'
    return res.status(200).json({
        message: "Hello and goodbye",
        metadata: strCompress.repeat(100000)
    })
})

//handing error


module.exports = app