const mysql = require('mysql')
const { DB_HOST, DB_USERNAME, DB_NAME, DB_PASSWORD } = process.env

const pool = mysql.createPool({
  connectionLimit: 10,
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME
})

module.exports.pool = pool
