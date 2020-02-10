const express = require('express')
const router = express.Router()
const axios = require('axios')
const apiData = require('../shared/rapidApiData')

/* API Search ES5 Sintax*/
// Sample search /search?title=muppets
router.get('/search', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

  const url = `${apiData.baseApiURL}?s=${req.query.title}&page=1`
  axios
    .get(url, { headers: apiData.headers })
    .then(response => {
      res.status(200).json(response.data)
    })
    .catch(err => next(err))
})

/* API Search ES6 Sintax*/

// Sample search /search?title=muppets
// router.get('/search', async (req, res, next) => {
//   const url = `${apiData.baseApiURL}?s=${req.query.title}&page=1`
//   if (req.query.title) {
//     try {
//       const response = await axios.get(url, { headers: apiData.headers })
//       res.status(200).json(response.data)
//     } catch (err) {
//       return next(err)
//     }
//   }
//   res.send('search')
// })

module.exports = router
