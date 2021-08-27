const express = require('express')
const server = express()
const port = 8000

const api = require('./public/api')

server.use('/public', api)

server.listen(port, () => console.log(`Listening on port ${port}!`))

module.exports = server