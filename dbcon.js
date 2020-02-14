const mysql = require('mysql')
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'classmysql.engr.oregonstate.edu',
  user: 'cs340_turatip',
  password: '8349',
  database: 'cs340_turatip'
})

module.exports.pool = pool
