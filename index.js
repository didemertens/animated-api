const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const { port, dbURI } = require('./config/environment')
const logger = require('./lib/logger')
const router = require('./config/router')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log(err)
    console.log('Mongoose connected')
  })

app.use(bodyParser.json())

app.use(logger)

app.use('/api', router)

app.listen(port, () => console.log(`Express is running on port ${port}`))