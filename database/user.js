const User = require('./schemas/User')

async function login(data) {
    const result = await User.findOne({ name: data.name }).exec()
    if (result && result.password == data.password) {
        delete result.password
        result.status = true
        return result
    } else {
        return {
            name: data.name,
            status: false
        }
    }
}

async function register(data) {
    const result = await User.findOne({ name: data.name }).exec()

    if (result) {
        return {
            name: data.name,
            status: false
        }
    } else {
        const newUser = new User(data)
        const result = await newUser.save()

        delete result.password
        result.status = true
        return result
    }
}

module.exports = {
    login,
    register
}