const express = require('express')
const router = express.Router()

const forum = require('../database/forum')

// define the home page route
router.get('/', async (req, res) => {
    const allPosts = await forum.getAllPosts()
    
    res.status(200)
    res.send(allPosts)
})

router.post('/', async (req, res) => {
    const post = await forum.getRepliesOfPost(req.body.id)
    
    res.status(200)
    res.send(post)
})

router.post('/new', async (req, res) => {
    const post_id = await forum.newPost(req.body)
    
    res.status(200)
    res.send(post_id)
})

router.post('/reply', async (req, res) => {
    const post_id = await forum.newPost(req.body)
    
    res.status(200)
    res.send(post_id)
})

module.exports = router