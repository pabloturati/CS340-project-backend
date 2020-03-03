const mysql = require('mysql')
const { DB_HOST, DB_USERNAME, DB_NAME, DB_PASSWORD } = process.env

// OSU database connection
// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: DB_HOST,
//   user: DB_USERNAME,
//   password: DB_PASSWORD,
//   database: DB_NAME
// })

//Local database
const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: 'dmy4txea',
  database: 'cs_340_local',
  multipleStatements: true
})

module.exports.pool = pool
