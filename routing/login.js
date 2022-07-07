const express = require('express')
const router = express.Router()

const user = require('../database/user.js')

// define the home page route
router.post('/', async (req, res) => {
    const login = req.body.new ? await user.register(req.body) : await user.login(req.body)
    
    if (login.status) {
        res.status(200)
        res.send(login.message)
    } else {
        res.status(400)
        res.send(login.message)
    }
})

module.exports = router