const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }],
    title: String
}, { timestamps: true, versionKey: false })

const Post = mongoose.model('Post', PostSchema)

module.exports = Post