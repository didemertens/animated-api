const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const User = require('../models/user')

// check for headers.authorization, check if token starts with Bearer
// if not return 401
// get token by replacing 'Bearer ' with empty string
// validate token
// need new promise to see of jwt gives back payload or err
// payload gives back the sub with the user id
// then, find user with that id
// then, check if there is a user with that id in db
// catch, return 401 if not

function secureRoute(req, res, next) {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = req.headers.authorization.replace('Bearer ', '')

  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
    .then(payload => User.findById(payload.sub))
    .then(user => {
      if (!user) return res.status(401).json({ message: 'Unauthorized' })
      req.currentUser = user
      next()
    })
    .catch(() => res.status(401).json({ message: 'Unauthorized' }))
}

module.exports = secureRoute