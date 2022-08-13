const users = require('./queries/users')

async function login(data) {
    let result = await users.getUserByName(data.name)

    if (!result || result.length == 0 || result[0].password != data.password) {
        return false
    }

    result = result[0]
    delete result.password

    return result
}

async function register(data) {
    result = await users.insertUser(data.name, data.password)

    if (!result || result.length == 0) {
        return false
    }

    result = result[0]
    delete result.password

    return result
}

module.exports = {
    login,
    register
}