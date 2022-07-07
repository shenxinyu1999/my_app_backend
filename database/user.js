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
        if (result.Password == data.password) {
            return {
                status: true,
                message: 'Login Success.'
            }
        } else {
            return {
                status: false,
                message: 'Password incorrect.'
            }
        }
    } else {
        return {
            status: false,
            message: 'Username does not exist.'
        }
    }
}

async function register(data) {
    await client.connect();

    const database = client.db("MyDB");
    const user = database.collection("User")

    const query = { Username: data.name }
    const result = await user.findOne(query)

    if (result) {
        await client.close()
        return {
            status: false,
            message: 'Username already exists.'
        }
    } else {
        const query = { Username: data.name, Password: data.password }
        const result = await user.insertOne(query)
        
        await client.close()
        return {
            status: true,
            message: 'User created'
        }
    }    
}

module.exports = {
    login,
    register
}