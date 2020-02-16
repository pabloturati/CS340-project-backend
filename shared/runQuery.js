const mysql = require('../dbcon.js')

const runQuery = query => {
  return new Promise((resolve, reject) => {
    mysql.pool.query(query, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

module.exports = runQuery
