const Posts = require("../db/posts");
const Users = require("../db/users");

const getAllPosts = async (req, res) => {
    try {
        const response = await Posts.find({});
        res.send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}

const addPosts = async (req, res) => {
    try {
        const { authorId, caption, image } = req.body;

        const author = await Users.findByIdAndUpdate(authorId, {
            $push: {
                posts: {
                    caption,
                    image
                }
            }
        }).select({ _id: 1, name: 1, email: 1, image: 1, about: 1 });

        const response = await Posts.create({
            author,
            caption: caption || '',
            image: image || '',
        })

        res.send(response);
    } catch (error) {
        res.status(500).send(error)
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
        res.status(500).send(error)
    }
}

const addLike = async (req, res) => {
    try {
        const { id } = req.params;
        const { userid } = req.query;
        const user = await Users.findOne({ _id: userid }).select({ _id: 1, name: 1, email: 1, image: 1 })
        const response = await Posts.updateOne({ _id: id }, {
            $push: {
                likedBy: user
            }
        })
        res.send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}

const removeLike = async (req, res) => {
    try {
        const { id } = req.params;
        const { likeid } = req.query;
        const response = await Posts.findByIdAndUpdate(id, {
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
    getAllPosts,
    addPosts,
    updatePost,
    deletePost,
    addLike,
    removeLike
}