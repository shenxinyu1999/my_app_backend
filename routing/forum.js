const express = require('express')
const router = express.Router()

const threads = require('../database/threads')

// define the home page route
router.get('/', async (req, res) => {
    const allThreads = await threads.getAllThreads()
    
    res.status(200)
    res.send(allThreads)
})

router.post('/', async (req, res) => {
    const allPosts = await threads.getPostsOfThread(req.body.id)
    
    res.status(200)
    res.send(allPosts)
})

router.post('/new', async (req, res) => {
    const post_id = await threads.newThread(req.body)
    
    res.status(200)
    res.send(post_id)
})

module.exports = router