const express = require('express')
const router = express.Router()

const user = require('../database/user.js')

// define the home page route
router.post('/', (req, res) => {
    const loginSuccess = user.login(req.body)
    if (loginSuccess) {
        res.status(200)
        res.send('Login Success')
    } else {
        res.status(400)
        res.send('Login Fail')
    }
})

module.exports = router