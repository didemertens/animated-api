const Serie = require('../models/serie')

function index(req, res) {
  Serie
    .find()
    .populate('user')
    .then(series => res.status(200).json(series))
    .catch(err => res.json(err))
}

function show(req, res) {
  Serie
    .findById(req.params.id)
    .populate('comments.user')
    .then(film => {
      if (!film) return res.status(404)
      return res.status(200).json(film)
    })
    .catch(err => res.json(err))
}

function create(req, res) {
  req.body.user = req.currentUser
  Serie
    .create(req.body)
    .then(serie => res.status(201).json(serie))
    .catch(err => res.json(err))
}

function update(req, res) {
  Serie
    .findById(req.params.id)
    .then(serie => {
      if (!serie) return res.sendStatus(404)
      if (!serie.user.equals(req.currentUser._id)) return res.sendStatus(401)
      serie.set(req.body)
      return serie.save()
    })
    .then((serie) => res.status(202).json(serie))
    .catch(err => res.json(err))
}

function destroy(req, res) {
  Serie
    .findById(req.params.id)
    .then(serie => {
      if (!serie) return res.sendStatus(404)
      if (!serie.user.equals(req.currentUser._id)) return res.sendStatus(401)
      serie.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(err => res.json(err))
}


function createComment(req, res) {
  req.body.user = req.currentUser
  Serie
    .findById(req.params.id)
    .then(serie => {
      if (!serie) return res.sendStatus(404)
      console.log(serie)
      serie.comments.unshift(req.body)
      return serie.save()
    })
    .then(serie => res.status(201).json(serie))
    .catch(err => res.json(err))
}

function deleteComment(req, res) {
  Serie
    .findById(req.params.id)
    .then(serie => {
      if (!serie) return res.sendStatus(404)
      const comment = serie.comments.id(req.params.commentId)
      if (!comment) return res.sendStatus(404)
      if (!comment.user.equals(req.currentUser._id)) return res.sendStatus(401)
      comment.remove()
      return serie.save()
    })
    .then((serie) => res.status(202).json(serie))
    .catch(err => res.json(err))
}

module.exports = { index, show, create, destroy, update, createComment, deleteComment }