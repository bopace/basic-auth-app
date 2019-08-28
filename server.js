const express = require('express')
require('dotenv').config()

const app = express()

app.get('/public', function(req, res) {
  res.json({
    message: 'Hello from a public api!',
  })
})

app.listen(3001)
console.log('api server listening on ' + process.env.REACT_APP_AUTH0_AUDIENCE)
