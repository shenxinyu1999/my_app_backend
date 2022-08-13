require('dotenv').config()
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
require('./database/client')
require('./database/client_pg')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const login = require('./routing/login')
app.use('/login', login)

const forum = require('./routing/forum')
app.use('/forum', forum)