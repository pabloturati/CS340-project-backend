const express = require('express')
const router = express.Router()
var path = require('path')

/* GET home page */
router.get('/', (req, res, next) => {
  res.sendFile(path.join(global.appRoot + '/public/index33.html')) //Will be updated to
})

module.exports = router
