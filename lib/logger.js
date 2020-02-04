function logger(req, res, next) {
  console.log(`Request ${req.method} to ${req.url}`)
  next()
}

module.exports = logger