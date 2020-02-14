const express = require('express')
const router = express.Router()
var path = require('path')

/* GET home page */
// TODO. Will be updated to serve React App build.
// Currently serves mock index apge

router.get('/', (req, res, next) => {
  res.sendFile(path.join(global.appRoot + '/public/index33.html')) //Will be updated to React SPA
})

module.exports = router
