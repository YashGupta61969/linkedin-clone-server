const bcrypt = require("bcrypt");
const Users = require("../db/users");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({});
        res.send(users)
    } catch (error) {
        res.send(error)
    }
}

const getSingleUser = async (req, res) => {
    try {
        const id = req.params;
        const user = await Users.findOne({ _id: id });
        res.send(user)
    } catch (error) {
        res.send(error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = jwt.sign({
            email,
            password
        }, 'secretkey', {
            expiresIn: '5h'
        });

        const response = await Users.findOne({ email: req.body.email }).select({ __v: 0 });
        if (response) {
            const isPasswordCorrect = await bcrypt.compare(password, response.password)

            if (isPasswordCorrect) {
                res.send({ response, token })
            } else {
                res.status(401).send({ message: 'Password Do Not Match' })
            }
        } else {
            res.status(404).send({ message: 'No User Found' })
        }
    } catch (error) {
        res.send(error)
    }
}

const signup = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const newObject = { ...req.body, password: hash, image:`http://localhost:8000/public/${req.file.filename.replace('./','')}` }
        const response = await Users.create(newObject)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
}

const addSkills = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Users.findByIdAndUpdate(id, {
            skills: req.body
        })
        res.send(response)
    } catch (error) {
        res.send(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Users.findByIdAndUpdate(id, req.body)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
}

const removeSkills = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Users.findByIdAndUpdate(id, {
            skills: []
        })
        res.send(response)
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    getAllUsers,
    getSingleUser,
    login,
    signup,
    addSkills,
    updateUser,
    removeSkills
}