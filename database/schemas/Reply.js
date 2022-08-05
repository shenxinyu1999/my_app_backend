const mongoose = require('mongoose')

const ReplySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String
}, { timestamps: true, versionKey: false })

const Reply = mongoose.model('Reply', ReplySchema)

module.exports = Reply