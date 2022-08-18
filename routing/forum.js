const express = require('express')
const router = express.Router()

const forum = require('../database/forums')

// define the home page route
router.get('/', async (req, res) => {
    const result = await forum.getAllPosts()
    
    if (!result) {
        res.sendStatus(400)
    } else {
        res.send(result)
    }
})

router.post('/new', async (req, res) => {
    const result = await forum.newPost(req.body)
    
    if (!result) {
        res.sendStatus(400)
    } else {
        res.send(result)
    }
})

router.post('/', async (req, res) => {
    const result = await forum.getPost(req.body)
    
    if (!result) {
        res.sendStatus(400)
    } else {
        res.send(result)
    }
})

router.post('/reply', async (req, res) => {
    const result = await forum.newReply(req.body)
    
    if (!result) {
        res.sendStatus(400)
    } else {
        res.send(result)
    }
})

module.exports = router