const Users = require("../db/users");

const follow = async (req, res) => {
    try {
        const { followedBy, followedTo } = req.body;

        const currentUser = await Users.findByIdAndUpdate(followedBy, {
            $push: {
                following: followedTo
            }
        }, { new: true });

        await Users.findByIdAndUpdate(followedTo, {
            $push: {
                followers: followedBy
            }
        })

        res.send(currentUser)
    } catch (error) {
        res.status(500).send(error)
    }
}

const unFollow = async (req, res) => {
    try {
        const { unfollowedBy, unfollowedTo } = req.body;

        const currentUser = await Users.findByIdAndUpdate(unfollowedBy, {
            $pull: {
                following: unfollowedTo
            }
        }, { new: true });

        await Users.findByIdAndUpdate(unfollowedTo, {
            $pull: {
                followers: unfollowedBy
            }
        })

        res.send(currentUser)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    follow,
    unFollow
}