const express = require('express')
const router = express.Router()
const queries = require('../shared/queries')
const {
  createUserEntry,
  createUserTable,
  findUserByEmail,
  verifyCredentials
} = queries

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  if (email && password) {
    // Find the user
    findUserByEmail(email)
      .then(userData => {
        // If found, verify credentials
        if (userData.length > 0) {
          verifyCredentials(email, password)
            .then(() => {
              const user = userData[0]
              //Create session
              req.session.userId = user.user_id
              delete user.password
              delete user.user_id

              const { cookie } = req.session
              res.status(200).send({ ...user, expires: cookie.expires })
            })
            .catch(err => next(err))
        } else {
          req.body.err = 'Wrong password'
          res.status(401).send('Unauthorized')
        }
      })
      .catch(err => next(err))
  } else {
    req.body.err = 'Wrong password'
    res.send(req.body)
  }
})

router.post('/signup', (req, res, next) => {
  const { email, password, first_name, last_name } = req.body

  if (email && first_name && last_name && password) {
    //Verify Users table exists, if not create it
    createUserTable()
      .then(() => {
        //Check if user exists.
        findUserByEmail(email)
          .then(result => {
            //If user exists, return bad request
            if (result.length > 0) {
              res.status(409).send('User exists')
            } else {
              //If user does not exists, create it
              createUserEntry(email, first_name, last_name, password)
                .then(result => {
                  req.session.userId = result.insertId //Create session
                  res.status(201).send(req.session)
                })
                .catch(err => next(err))
            }
          })
          .catch(err => next(err))
      })
      .catch(err => next(err))
  } else {
    res.status(400).send('Incomplete data')
  }
})

router.post('/logout', (req, res, next) => {
  req.session.destroy(error => {
    if (error) {
      req.body.error = error
      req.body.success = false
      return res.status(500).send(req.body)
    }
  })
  res.clearCookie(process.env.SESSION_NAME)
  req.body.sucess = true
  res.status(200).send(req.body)
})

module.exports = router
