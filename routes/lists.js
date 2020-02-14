const router = require('express').Router()
const mysql = require('../dbcon.js')

router.get('/mysqltest', function (req, res, next) {
  var context = {}
  mysql.pool.query('SELECT * FROM bsg_planets', function (err, rows, fields) {
    err = { myfakeErr: 'hola' }
    if (err) {
      next(err)
      return
    }
    context.results = rows
    res.send(context)
  })
})

module.exports = router
