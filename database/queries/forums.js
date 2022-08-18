const client = require('./client')

async function getAllPosts() {
    const query = 'SELECT posts.*, users.name FROM posts JOIN users ON users.user_id = posts.user_id;'
    try {
        const res = await client.query(query)
        return res.rows
    } catch (err) {
        console.log(err.stack)
        return false
    }
}

async function newPost(user_id, title, content) {
    const query = 'INSERT INTO posts(user_id, title, content) VALUES ($1, $2, $3) RETURNING *;'
    try {
        const res = await client.query(query, [user_id, title, content])
        return res.rows
    } catch (err) {
        console.log(err.stack)
        return false
    }
}

async function getPost(post_id) {
    const query = 'SELECT posts.*, users.name FROM posts JOIN users ON users.user_id = posts.user_id WHERE post_id = $1;'
    try {
        const res = await client.query(query, [post_id])
        return res.rows
    } catch (err) {
        console.log(err.stack)
        return false
    }
}

async function getRepliesOfPost(post_id) {
    const query = 'SELECT replies.*, users.name FROM replies JOIN users ON users.user_id = replies.user_id WHERE post_id = $1;'
    try {
        const res = await client.query(query, [post_id])
        return res.rows
    } catch (err) {
        console.log(err.stack)
        return false
    }
}

async function newReply(user_id, post_id, content) {
    const query = 'INSERT INTO replies(user_id, post_id, content) VALUES ($1, $2, $3) RETURNING *;'
    try {
        const res = await client.query(query, [user_id, post_id, content])
        return res.rows
    } catch (err) {
        console.log(err.stack)
        return false
    }
}

module.exports = {
    getAllPosts,
    newPost,
    getPost,
    getRepliesOfPost,
    newReply,
}