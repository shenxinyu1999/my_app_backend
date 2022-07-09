const app = express()
const cors = require('cors');
app.use(cors())

require('dotenv').config()

const express = require('express')

const bodyParser = require('body-parser')

const port = process.env.PORT || 3000

const login = require('./routing/login')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/login', login)