require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session')
const path = require('path')
var cors = require('cors')

const MySQLStore = require('express-mysql-session')(session)
const mysql = require('./dbcon.js')

const { SESSION_NAME, SESSION_DURATION, SESSION_SECRET } = process.env

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
const sessionStore = new MySQLStore(
  {
    expiration: 10800000, //3h
    createDatabaseTable: true,
    schema: {
      tableName: 'Sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data'
      }
    }
  },
  mysql.pool
)

app.use(
  session({
    cookie: {
      maxAge: parseInt(SESSION_DURATION),
      sameSite: 'strict'
    },
    name: SESSION_NAME,
    resave: false,
    saveUninitialized: false, //Verify
    store: sessionStore,
    secret: SESSION_SECRET
  })
)

// Express View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

/* App routes */
// Index. Used to provide React app
const index = require('./routes/index')
const movieSearch = require('./routes/movieSearch')
const auth = require('./routes/auth')
const lists = require('./routes/lists')
const dbTests = require('./routes/dbTests')

app.use('/', dbTests)
app.use('/', movieSearch)
app.use('/', auth)
app.use('/lists', lists)
app.use('/', index)

module.exports = app
