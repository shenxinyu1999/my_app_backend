const forums = require('./queries/forums')

async function getAllPosts() {
    let result = await forums.getAllPosts()

    if (!result || result.length == 0) {
        return false
    }

    return result
}

async function newPost(data) {
    let result = await forums.newPost(data.user_id, data.title, data.content)

    if (!result || result.length == 0) {
        return false
    }

    result = result[0]

    return {
        post_id: result.post_id
    }
}

async function getPost(data) {
    let res = await forums.getPost(data.post_id)

    if (!res || res.length == 0) {
        return false
    }

    const result = {}
    result.original = res[0]

    res = await forums.getRepliesOfPost(data.post_id)

    if (!res) {
        return false
    }

    result.replies = res

    return result
}

async function newReply(data) {
    let result = await forums.newReply(data.user_id, data.post_id, data.content)

    if (!result || result.length == 0) {
        return false
    }

    result = result[0]

    return {
        post_id: result.post_id
    }
}

module.exports = {
    getAllPosts,
    newPost,
    getPost,
    newReply,
}
