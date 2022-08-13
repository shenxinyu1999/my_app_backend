const client = require('./queries/client')

async function getAllPosts() {
    const allPosts = await Post.find({}, '-replies').populate('user', '_id name')
    return allPosts
}

async function newPost(data) {
    const post = new Post({ user: data.user, title: data.title, replies: [] })
    const res = await post.save()
    const result = await newReply({ user: data.user, content: data.content, post: res._id })

    return result
}


async function getRepliesOfPost(id) {
    const post = await Post.findById(id).populate('user', '_id name').populate({ path: 'replies', populate: { path: 'user', select: '_id name' } })
    return post
}

async function newReply(data) {
    const post = await Post.findById(data.post)

    const reply = new Reply({ user: data.user, content: data.content })
    const res = await reply.save()

    await post.replies.push(res._id)
    const result = await post.save()

    return result
}

module.exports = {
    getAllPosts,
    getRepliesOfPost,
    newPost,
    newReply,
}
