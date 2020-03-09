const router = require('express').Router()
const queries = require('../shared/queries')
const runQuery = require('../shared/runQuery')

const {
  getAllLists,
  listItemsPerList,
  listDetailsByListId,
  getUsersList
} = queries.listQueries

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

// Returns user's lists
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

module.exports = router
