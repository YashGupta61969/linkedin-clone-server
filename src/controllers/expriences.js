const Users = require("../db/users")

const addExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Users.findByIdAndUpdate(id, {
            $push: {
                experiences: req.body
            }
        })
        res.send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const { expid, company, role } = req.body;
        const response = await Users.updateOne({ _id: id, "experience.id": expid }, {
            $set: {
                "experience.name": company,
                "experience.name": role
            }
        })
        res.send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}
const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const { expid } = req.query;
        const response = await Users.updateOne({ _id: id }, {
            $pull: {
                experiences: {
                    _id: expid
                }
            }
        })
        res.send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    addExperience,
    updateExperience,
    deleteExperience
}