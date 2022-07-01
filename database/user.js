const { query } = require('express');
const client = require('./client.js')

function login(data) {
    client.connect(err => {
        const database = client.db("MyDB");
        const user = database.collection("User")

        const query = {Username: data.name}

        user.findOne(query, (err, result) => {
            client.close()
            if (result) {
                return result.Password == data.password
            } else {
                return false
            }
        })
    })
}

module.exports = {
    login
}