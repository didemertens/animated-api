const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function register(req, res) {
  User
    .create(req.body)
    .then(user => res.status(201).json({ message: `Thanks, ${user.username}` }))
    .catch(err => res.json(err))
}

// Login
// find the user by their email, use findOne with key of email and value req.body.email
// check if user exists
// validate the password with method of model
// the req.body.password is the string password (user.password = model, so password in db)
// if not return res unauthorized

// add a token
// secret in environment.js
// add user id as sub key so we can use it later in secureRoute (jwt payload)
// add expiresIn key

// respond with welcome message and token

function login(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) return res.status(401).json({ message: 'Unauthorized' })
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
      res.status(202).json({
        message: `Welcome back, ${user.username}!`,
        user,
        token
      })
    })
    .catch(err => res.json(err))
}

module.exports = { register, login }