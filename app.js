require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')

//View engine config
require('hbs')
const path = require('path')
const app_name = require('./package.json').name
global.appRoot = path.resolve(__dirname) //Save root to global

require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`)

const app = express()

// Middleware Setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Express View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))

/* App routes */
// Index. Used to provide React app
const index = require('./routes/index')
app.use('/', index)

module.exports = app
