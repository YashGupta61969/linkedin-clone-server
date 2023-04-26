const Posts = require("../db/posts");
const Users = require("../db/users");

const addPosts = async (req, res) => {
    try {
        const { authorId, caption, image } = req.body;

        const author = await Users.findOne({ _id: authorId }).select({ _id: 1, name: 1, email: 1 })
        const response = await Posts.create({
            author,
            caption: caption || '',
            image: image || '',
        })

        await Users.findByIdAndUpdate(authorId,{
            $push:{
                posts:{
                    _id:response._id,
                    caption,
                    image
                }
            }
        })
        res.send(response);
    } catch (error) {
        res.send(error)
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Posts.findByIdAndUpdate(id, req.body)
        res.send(response);
    } catch (error) {
        res.send(error)
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Posts.findByIdAndDelete(id)
        res.send(response);
    } catch (error) {
        res.send(error)
    }
}

const addLikes = async (req, res) => {
    try {
        const { id } = req.params;
        const { userid } = req.query;
        const user = await Users.findOne({ _id: userid }).select({ _id: 1, name: 1, email: 1 })
        const response = await Posts.updateOne({ _id: id }, {
            $inc: {
                likesCount: 1
            },
            $push: {
                likedBy: user
            }
        })
        res.send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}

const removeLikes = async (req, res) => {
    try {
        const { id } = req.params;
        const { likeid } = req.query;
        const response = await Posts.findByIdAndUpdate(id, {
            $inc: {
                likes: -1
            },
            $pull: {
                likedBy: { _id: likeid }
            },
        }, { new: true })
        res.send(response)
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    addPosts,
    updatePost,
    deletePost,
    addLikes,
    removeLikes
}