const { Timestamp } = require('mongodb');
const client = require('./client.js')

async function getAllThreads() {
    await client.connect();

    const database = client.db("MyDB");
    const threads = database.collection("Threads")

    const cursor = await threads.find({})
    const allThreads = await cursor.toArray();

    await client.close()

    return allThreads
}

async function getPostsOfThread(id) {
    await client.connect();

    const database = client.db("MyDB");
    const posts = database.collection("Posts")

    const cursor = await posts.find({ "thread_id": id })
    const allPosts = await cursor.toArray();

    await client.close()

    return allPosts
}

async function newThread(data) {
    await client.connect();

    const database = client.db("MyDB");
    const threads = database.collection("Threads")

    const query = { user_id: data.user_id, title: data.title, time: Timestamp() }
    const result = await threads.insertOne(query)

    await client.close()

    const newData = {
        thread_id: result.insertedId,
        user_id: data.user_id,
        content: data.content,
    }

    const newResult = await newPost(newData)
    
    return result.insertedId
}

async function newPost(data) {
    await client.connect();

    const database = client.db("MyDB");
    const posts = database.collection("Posts")

    const query = { 
        thread_id: data.insertedId,
        user_id: data.user_id,
        content: data.content,
        time: Timestamp(),
    
    }
    const result = await posts.insertOne(query)

    await client.close()
    
    return result.insertedId
}

module.exports = {
    getAllThreads,
    getPostsOfThread,
    newThread,
    newPost
}
