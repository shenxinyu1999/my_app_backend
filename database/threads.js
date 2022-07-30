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

    const query = { title: data.title, time: Timestamp() }
    const result = await threads.insertOne(query)

    await client.close()
    
    return result.insertedId
}

module.exports = {
    getAllThreads,
    getPostsOfThread,
    newThread
}
