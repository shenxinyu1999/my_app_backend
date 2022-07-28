const express = require('express')
const router = express.Router()

const threads = require('../database/threads')

// define the home page route
router.get('/', async (req, res) => {
    const allThreads = await threads.getAllThreads()
    
    res.status(200)
    res.send(allThreads)
})

module.exports = router