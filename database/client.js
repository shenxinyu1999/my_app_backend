/*
onst { MongoClient, ServerApiVersion } = require('mongodb')
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@forum.atxlmbz.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

module.exports = client
*/
const mongoose = require('mongoose')
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@forum.atxlmbz.mongodb.net/MyDB?retryWrites=true&w=majority`

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect(uri)
}