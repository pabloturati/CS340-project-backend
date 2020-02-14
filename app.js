require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session')
const path = require('path')

const {
  ORIGIN_DOMAIN,
  SESSION_NAME,
  SESSION_DURATION,
  SESSION_SECRET
} = process.env

//View engine config
require('hbs')
const app_name = require('./package.json').name

//Save root address to global variables
global.appRoot = path.resolve(__dirname)

//Configure debug
require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`)

//Create server
const app = express()

// Middleware Setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// Session configuration
app.use(
  session({
    cookie: {
      maxAge: parseInt(SESSION_DURATION),
      sameSite: 'strict'
    },
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
)

// Express View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))

//Cors policy configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ORIGIN_DOMAIN)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

/* App routes */
// Index. Used to provide React app
const index = require('./routes/index')
const movieSearch = require('./routes/movieSearch')
const auth = require('./routes/auth')
const lists = require('./routes/lists')

app.use('/', movieSearch)
app.use('/', auth)
app.use('/', lists)
app.use('/', index)

module.exports = app
