const express = require('express')
const router = express.Router()
const queries = require('../shared/queries')

const {
  allGenres,
  createNewGenre,
  deleteGenre,
  updateGenre
} = queries.genreQueries
router.get('/all', (req, res, next) => {
  allGenres()
    .then(genres => res.status(200).json(genres))
    .catch(error => {
      console.error(error)
      next()
      res.status(500).send(error)
    })
})

router.post('/', (req, res, next) => {
  createNewGenre(req.body.genre_name)
    .then(response => {
      req.body.success = true
      req.body.genre_id = response.insertId
      res.status(200).send(req.body)
    })
    .catch(error => {
      console.error(error)
      res.status(400).send({ message: error.sqlMessage || error })
    })
})

router.delete('/:id', (req, res, next) => {
  deleteGenre(req.params.id)
    .then(response => {
      req.body.success = true
      req.body.genre_id = response.insertId
      res.status(200).send(req.body)
    })
    .catch(error => {
      console.error(error)
      res.status(400).send({ message: error.sqlMessage || error })
    })
})
router.patch('/', (req, res, next) => {
  const { id, newValue } = req.body || {}
  if (id && newValue)
    updateGenre(id, newValue)
      .then(response => {
        req.body.success = true
        req.body.genre_id = response.insertId
        res.status(200).send(req.body)
      })
      .catch(error => {
        console.error(error)
        res.status(400).send({ message: error.sqlMessage || error })
      })
})

module.exports = router
