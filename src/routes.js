const express = require('express')

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('Routes configured!')
})

module.exports = routes
