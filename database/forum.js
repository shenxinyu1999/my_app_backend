const { Timestamp, ObjectId } = require('mongodb');
const client = require('./client.js')

async function getAllPosts() {
    await client.connect();

    const database = client.db("MyDB")

    const posts = database.collection("posts")
    const cursor = await posts.find({})
    const allPosts = await cursor.toArray();

    await client.close()

    return allPosts
}

async function getRepliesOfPost(id) {
    await client.connect();

    const database = client.db("MyDB")
    
    const posts = database.collection("posts")
    const post = await posts.findOne({ _id: ObjectId(id) })
    
    const replies = database.collection("replies")
    const cursor = await replies.find({ post_id: id }).project({ post_id: 0 })
    const allReplies = await cursor.toArray();

    post.allReplies = allReplies

    await client.close()

    return post
}

async function newPost(data) {
    await client.connect();

    const database = client.db("MyDB")
    
    const posts = database.collection("posts")
    const query = { user_id: data.user_id, title: data.title, time: Timestamp() }
    const result = await posts.insertOne(query)

    await client.close()

    const newData = {
        post_id: result.insertedId.toString(),
        user_id: data.user_id,
        content: data.content,
    }

    const newResult = await newReply(newData)
    
    return result.insertedId
}

async function newReply(data) {
    await client.connect();

    const database = client.db("MyDB")
    
    const replies = database.collection("replies")
    const query = { 
        post_id: data.post_id,
        user_id: data.user_id,
        content: data.content,
        time: Timestamp(),
    
    }
    const result = await replies.insertOne(query)

    await client.close()
    
    return result.insertedId
}

module.exports = {
    getAllPosts,
    getRepliesOfPost,
    newPost,
    newReply,
}
