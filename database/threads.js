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

module.exports = {
    getAllThreads,
}