const client = require('./client')

async function getAllUsers() {
    const query = 'SELECT * FROM users;'
    try {
        const res = await client.query(query)
        return res.rows
    } catch (err) {
        console.log(err.stack)
        return false
    }
}

async function getUserByName(name) {
    const query = 'SELECT * FROM users WHERE name = $1;'
    try {
        const res = await client.query(query, [name])
        return res.rows
    } catch (err) {
        console.log(err.stack)
        return false
    }
}

async function insertUser(name, password) {
    const query = 'INSERT INTO users VALUES($1, $2) RETURNING *;'
    try {
        const res = await client.query(query, [name, password])
        return res.rows
    } catch (err) {
        console.log(err.stack)
        return false
    }
}

module.exports = {
    getAllUsers,
    getUserByName,
    insertUser
}