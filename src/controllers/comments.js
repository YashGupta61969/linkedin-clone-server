const Posts = require("../db/posts");
const Users = require("../db/users");

const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { message, userid } = req.body;

        const user = await Users.findById(userid).select({ _id: 1, name: 1, image: 1 })

        const response = await Posts.findByIdAndUpdate(id, {
            $push: {
                comments: { author: user, message }
            }
        }, { new: true });
        res.send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { commentid } = req.query;
        const response = Posts.updateOne({ _id: id, "comment.$.commentid": commentid })
        res.send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { commentid } = req.query;
        const response = await Posts.updateOne({ _id: id, }, {
            $pull: {
                comments: { _id: commentid }
            }
        })
        res.send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    addComment,
    updateComment,
    deleteComment
}