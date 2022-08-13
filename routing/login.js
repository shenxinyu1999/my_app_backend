const express = require('express')
const router = express.Router()

const users = require('../database/users.js')

router.post('/', async (req, res) => {
    const result = await users.login(req.body)

    if (!result) {
        res.sendStatus(400)
    } else {
        res.send(result)
    }
})

router.post('/register', async (req, res) => {
    const result = await users.register(req.body)

    if (!result) {
        res.sendStatus(400)
    } else {
        res.send(result)
    }
})

module.exports = router