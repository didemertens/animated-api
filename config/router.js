const router = require('express').Router()
const films = require('../controllers/films')
const series = require('../controllers/series')
const users = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

// FILMS
router.route('/films')
  .get(films.index)
  .post(secureRoute, films.create)

router.route('/films/:id')
  .get(films.show)
  .put(secureRoute, films.update)
  .delete(secureRoute, films.destroy)

router.route('/films/:id/comments')
  .post(secureRoute, films.createComment)

router.route('/films/:id/comments/:commentId')
  .delete(secureRoute, films.deleteComment)

// SERIES
router.route('/series')
  .get(series.index)
  .post(secureRoute, series.create)

router.route('/series/:id')
  .get(series.show)
  .put(secureRoute, series.update)
  .delete(secureRoute, series.destroy)

router.route('/series/:id/comments')
  .post(secureRoute, series.createComment)

router.route('/series/:id/comments/:commentId')
  .delete(secureRoute, series.deleteComment)

// AUTH
router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

module.exports = router