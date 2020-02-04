const port = process.env.PORT || 4000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/animation-films-api'
const secret = process.env.SECRET || 'this is secret'

module.exports = { port, dbURI, secret }