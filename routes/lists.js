const router = require('express').Router()
const queries = require('../shared/queries')
const runQuery = require('../shared/runQuery')
const moment = require('moment')

const { listQueries, genreQueries } = queries

const {
  getAllLists,
  listItemsPerList,
  listDetailsByListId,
  getUsersList,
  createListEntry,
  createListGenreEntry,
  updateListEntry
} = listQueries

const { deleteAllOfListGenres } = genreQueries

//Sort options:  'none', 'date' by publish date DESC, 'likes' by number_of_likes 'descending'
router.get('/all?:sort', (req, res, next) => {
  const { sort } = req.query
  const { noOrder, byLikes, byDates } = getAllLists

  let query = noOrder //For sort=none
  if (sort === 'date') query = byDates
  else if (sort === 'likes') query = byLikes

  //Get all lists
  runQuery(query)
    //For each list get it's content.
    .then(lists => {
      const promises = []
      lists &&
        lists.length > 0 &&
        lists.forEach(list => {
          list.items = []
          promises.push(
            //Get each Lists' items
            listItemsPerList(list.list_id)
              .then(items => {
                list.items = [].concat(items)
              })
              .catch(error => {
                console.error(error)
              })
          )
        })
      //Return List populated with ListItems when all promises ListItems are fetched
      Promise.all(promises).then(() => {
        res.status(200).json(lists)
      })
    })
    .catch(error => {
      console.error(error)
    })
})

// Returns all of the lists of an specific user
router.get('/user?:id', (req, res, next) => {
  const { id } = req.query
  getUsersList(id)
    .then(lists => {
      const promises = []
      lists &&
        lists.length > 0 &&
        lists.forEach(list => {
          list.items = []
          promises.push(
            //Get each Lists' items
            listItemsPerList(list.list_id)
              .then(items => {
                list.items = [].concat(items)
              })
              .catch(error => {
                console.error(error)
              })
          )
        })
      //Return List populated with ListItems when all promises ListItems are fetched
      Promise.all(promises).then(() => {
        res.status(200).json(lists)
      })
    })
    .catch(error => {
      console.error(error)
    })
})

//Returns a lists details
router.get('/:listId', (req, res, next) => {
  //Get ListId and validate it to exista and to be a number
  let { listId } = req.params || {}
  listId = parseInt(listId)
  const validParam = listId && typeof listId === 'number'

  if (validParam) {
    listDetailsByListId(listId)
      .then(results => {
        if (results[0].length === 0) {
          //If no list information
          res.status(400).json({ message: 'List Id does not exists' })
        } else {
          //Create a list object
          const body = {}
          Object.assign(body, results[0][0])
          //Add key with listItems array
          body.listItems = results[1]
          res.status(200).json(body)
        }
      })
      .catch(error => {
        console.error(error)
      })
  } else {
    res.status(400).json({ message: 'Bad param' })
  }
})

router.post('/new', (req, res, next) => {
  const { name: listName, genres = [], user_id: userId } = req.body || {}
  try {
    if (listName && genres.length > 0 && userId) {
      const date = moment().format('MM-DD-YYYY')

      createListEntry(userId, listName, date, 0, 0)
        .then(results => {
          const listId = results.insertId

          const promises = []
          genres.forEach(genre => {
            promises.push(createListGenreEntry(listId, genre).then())
          })
          Promise.all(promises).then(() => {
            res.status(200).json({ success: true, listId })
          })
        })
        .catch(() => {
          res
            .status(500)
            .json({ success: false, message: 'Ups. Our fault failed request' })
        })
    } else {
      throw { message: 'Bad user input' }
    }
  } catch (e) {
    res.status(400).json(e)
  }
})

router.patch('/edit-list', (req, res, next) => {
  const { name: listName, genres = [], listId } = req.body || {}
  // try {
  if (listName && genres.length > 0 && listId) {
    const date = moment().format('MM-DD-YYYY')

    updateListEntry(listId, listName, date)
      .then(() => {
        deleteAllOfListGenres(listId)
          .then(() => {
            const promises = []
            genres.forEach(genre => {
              promises.push(createListGenreEntry(listId, genre).then())
            })
            Promise.all(promises).then(() => {
              res.status(200).json({ success: true, listId })
            })
          })
          .catch(e => {
            console.error(error)
          })
      })
      .catch(() => {
        res
          .status(500)
          .json({ success: false, message: 'Ups. Our fault failed request' })
      })
  } else {
    res.status(400).send({ message: 'Could not process request' })
  }
})

module.exports = router
