const mongoose = require('mongoose')

const postsSchema = mongoose.Schema({
    author: {
        _id: String,
        name: String,
        email: String,
        about: String,
        image: String
    },
    caption: String,
    image: String,
    likedBy: [String],
    comments: [
        {
            author: {
                _id: String,
                name: String,
                image: String
            },
            message: String,
        }
    ]
})

const Posts = mongoose.model('Post', postsSchema)

module.exports = Posts