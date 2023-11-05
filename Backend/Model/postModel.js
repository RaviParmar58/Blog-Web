const mongoose = require('mongoose')

const PostSchema= new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    summary: {
        type: String,
        require: true
    }, 
    postThumnail: {
        type: String,
        require: true
    },
    postContent: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userInfo'
    }
}, {timestamps: true})

const PostModel = mongoose.model('post', PostSchema)
module.exports = PostModel