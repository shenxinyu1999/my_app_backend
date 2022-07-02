const express = require('express')
const router = express.Router()

const user = require('../database/user.js')

// define the home page route
router.post('/', async (req, res) => {
    const loginSuccess = await user.login(req.body)
    if (loginSuccess) {
        console.log('suc')
        res.status(200)
        res.send('success')
    } else {
        console.log('fail')
        res.status(400)
        res.send('fail')
    }
})

module.exports = router