const express = require('express')
const router = express.Router()

const user = require('../database/user.js')

// define the home page route
router.post('/', async (req, res) => {
    const result = req.body.new ? await user.register(req.body) : await user.login(req.body)
    
    if (result.status) {
        res.status(200)
        res.send(result)
    } else {
        res.status(400)
        res.send(result)
    }
})

module.exports = router