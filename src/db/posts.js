const mongoose = require('mongoose')

const postsSchema = mongoose.Schema({
    author: {
        _id:String,
        name:String,
        email:String
    },
    caption: {
        type: String,
    },
    image: {
        type: String
    },
    likedBy: [
        {
            _id:String,
            name: String,
            email: String
        }
    ],
    comments: [
        {
            message:String,
            name:String,
            email:String
        }
    ]
})

const Posts = mongoose.model('Post', postsSchema)

module.exports = Posts