const { query } = require('express');
const client = require('./client.js')

async function login(data) {
    await client.connect();

    const database = client.db("MyDB");
    const user = database.collection("User")

    const query = { Username: data.name }

    const result = await user.findOne(query)

    await client.close()

    if (result) {
        return result.Password == data.password
    } else {
        return false
    }
}

module.exports = {
    login
}