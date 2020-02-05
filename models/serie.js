const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestaps: true
})

const serieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  stillRunning: { type: Boolean, required: true },
  image: { type: String, required: true },
  longDescription: { type: String, required: true, maxlength: 850 },
  description: { type: String, required: true, maxlength: 200 },
  comments: [commentSchema],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestaps: true
})

module.exports = mongoose.model('Serie', serieSchema)