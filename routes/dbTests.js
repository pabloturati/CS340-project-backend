const router = require('express').Router()
const mysql = require('../dbcon.js')

router.get('/mysqltest', function(req, res, next) {
  mysql.pool.query(
    'SHOW TABLES; SELECT * FROM Users; SELECT * FROM Genres;',
    function(err, rows, fields) {
      if (err) {
        next(err)
        return
      }
      res.render('home', { results: JSON.stringify(rows[0]) })
    }
  )
})

module.exports = router
