const express = require('express')
const router = express.Router()

//Temporary users
const Users = [
  {
    user_id: 1,
    email: 'john@gmail.com',
    password: 'secret',
    first_name: 'John',
    last_name: 'Smith'
  }
]

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  if (email && password) {
    //Find the user
    const { user } = Users.find(
      user => user.email === email && user.password === password
    )
    if (user) {
      req.session.userId = user.user_id
      req.body.sucess = true
      return res.status(200).send('success')
    }
  }
  req.body.err = 'Wrong password'
  req.body.success = false
  res.send(req.body)
})

router.post('/register', (req, res, next) => {
  const { email, password, first_name, last_name } = req.body
  if (email && password && first_name && last_name) {
    const exists = Users.some(user => user.email === email)
    if (!exists) {
      const newUser = {
        user_id: Users.length + 1,
        email,
        first_name,
        last_name,
        password
      }
      Users.push(newUser)
      req.session.userId = newUser.user_id
      req.body.sucess = true
      return res.status(201).send(req.body)
    }
    req.body.error = 'User already exists'
    req.body.success = false
    return res.status(409).send(req.body)
  }

  req.body.success = false
  req.body.err = 'Invalid data'
  res.status(400).send(req.body)
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
