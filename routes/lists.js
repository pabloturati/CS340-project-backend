const router = require('express').Router()
const mysql = require('../dbcon.js')

router.get('/mysqltest', function (req, res, next) {
  mysql.pool.query('SELECT * FROM bsg_planets', function (err, rows, fields) {
    if (err) {
      next(err)
      return
    }
    res.send({ results: rows })
  })
})

module.exports = router
