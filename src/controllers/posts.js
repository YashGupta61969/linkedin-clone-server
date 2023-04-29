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

const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Posts.findById(id);
        res.send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}

const addPosts = async (req, res) => {
    try {
        const { authorId, caption } = req.body;
        const image = req.file ? `http://localhost:8000/public/${req.file.filename}` : '';

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
            caption,
            image,
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

        const response = await Posts.updateOne({ _id: id }, {
            $push: {
                likedBy: userid
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
                likedBy: likeid
            },
        })
        res.send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    getAllPosts,
    getSinglePost,
    addPosts,
    updatePost,
    deletePost,
    addLike,
    removeLike
}