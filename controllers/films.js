const Film = require('../models/film')

function index(req, res) {
  Film
    .find()
    .populate('user')
    .then(films => res.status(200).json(films))
    .catch(err => res.json(err))
}

function create(req, res) {
  req.body.user = req.currentUser
  Film
    .create(req.body)
    .then(createdFilm => res.status(201).json(createdFilm))
    .catch(err => res.json(err))
}

function show(req, res) {
  Film
    .findById(req.params.id)
    .populate('comments.user')
    .then(foundFilm => {
      if (!foundFilm) return res.sendStatus(404)
      return res.status(202).json(foundFilm)
    })
    .catch(err => res.json(err))
}

function update(req, res) {
  Film
    .findById(req.params.id)
    .then(film => {
      if (!film) return res.sendStatus(404)
      if (!film.user.equals(req.currentUser._id)) return res.sendStatus(401)
      film.set(req.body)
      return film.save()
    })
    .then((film) => res.status(202).json(film))
    .catch(err => res.json(err))
}

function destroy(req, res) {
  Film
    .findById(req.params.id)
    .then(film => {
      if (!film) return res.sendStatus(404)
      if (!film.user.equals(req.currentUser._id)) return res.sendStatus(401)
      film.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(err => res.json(err))
}

function createComment(req, res) {
  req.body.user = req.currentUser
  Film
    .findById(req.params.id)
    .then(film => {
      if (!film) return res.sendStatus(404)
      film.comments.unshift(req.body)
      return film.save()
    })
    .then(film => res.status(201).json(film))
    .catch(err => res.json(err))
}

function deleteComment(req, res) {
  Film
    .findById(req.params.id)
    .then(film => {
      if (!film) return res.sendStatus(404)
      const comment = film.comments.id(req.params.commentId)
      if (!comment) return res.sendStatus(404)
      if (!comment.user.equals(req.currentUser._id)) return res.sendStatus(401)
      comment.remove()
      return film.save()
    })
    .then((film) => res.status(202).json(film))
    .catch(err => res.json(err))
}

module.exports = { index, create, show, update, destroy, createComment, deleteComment }