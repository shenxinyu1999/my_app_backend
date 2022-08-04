const client = require('./client.js')

async function login(data) {
    await client.connect();

    const database = client.db("MyDB");
    const user = database.collection("User")

    const query = { name: data.name }

    const result = await user.findOne(query)

    await client.close()

    if (result) {
        if (result.password == data.password) {
            delete result.password
            result.status = true
            return result
        } else {
            return {
                name: data.name,
                status: false,
                message: 'Password incorrect.'
            }
        }
    } else {
        return {
            name: data.name,
            status: false,
            message: 'Username does not exist.'
        }
    }
}

async function register(data) {
    await client.connect();

    const database = client.db("MyDB");
    const user = database.collection("User")

    const query = { name: data.name }
    const result = await user.findOne(query)

    if (result) {
        await client.close()
        return {
            status: false,
            message: 'Username already exists.'
        }
    } else {
        const query = data
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