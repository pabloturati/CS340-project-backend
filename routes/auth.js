const express = require('express')
const router = express.Router()
const queries = require('../shared/queries')

const {
  createUserEntry,
  findUserByEmail,
  verifyCredentials,
  userDataById
} = queries.authQueries

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
              //ES6 sintax.
              //res.status(200).send({ ...user, expires: cookie.expires })

              //ES5 sintax rollback for OSU Server.
              res
                .status(200)
                .send(Object.assign({ expires: cookie.expires }, user))
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
    //Check if user exists.
    findUserByEmail(email)
      .then(result => {
        //If user exists, return bad request
        if (result.length > 0) {
          res.status(409).send('User already exists')
        } else {
          //If user does not exists, create it
          createUserEntry(email, first_name, last_name, password)
            .then(result => {
              const userId = result.insertId
              req.session.userId = userId //Create session
              // res.status(201).send(req.session)
              const { cookie } = req.session

              //Fetch user data
              userDataById(userId)
                //If successful send the user information and cookie
                .then(user =>
                  //ES6 sintax.
                  // res
                  //   .status(200)
                  //   //Send user data and new session
                  //   .send({ ...user[0], expires: cookie.expires })

                  //ES5 sintax rollback for OSU Server.
                  res
                    .status(200)
                    .send(Object.assign({ expires: cookie.expires }, user[0]))
                )
                .catch(err => next(err))
            })
            .catch(err => next(err))
        }
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
