const express = require('express')
const { login, addSkills, getAllUsers, signup, removeSkills, getSingleUser, updateUser } = require('../controllers/users')
const auth = require('../middlewares/auth')
const { addPosts, updatePost, deletePost, getAllPosts, addLike, removeLike } = require('../controllers/posts')
const { addComment, updateComment, deleteComment } = require('../controllers/comments')
const { addExperience, updateExperience, deleteExperience } = require('../controllers/expriences')
const upload = require('../middlewares/multer')

const router = express.Router()

// users
router.get('/', getAllUsers)
router.get('/user/:id', getSingleUser)
router.post('/login', login)
router.post('/profile', upload, updateUser)
router.post('/signup', upload, signup)

// skills
router.patch('/addskills/:id', addSkills)
router.patch('/removeskills/:id', removeSkills)

// posts
router.get('/post/', getAllPosts)
router.post('/post/', upload, addPosts)
router.patch('/post/:id', updatePost)
router.delete('/post/:id', deletePost)

// likes
router.patch('/like/:id', addLike)
router.delete('/like/:id', removeLike)

// Comments
router.post('/comment/:id', addComment)
router.patch('/comment/:id', updateComment)
router.delete('/comment/:id', deleteComment)

// Experiences
router.post('/experience/:id', addExperience)
router.patch('/experience/:id', updateExperience)
router.delete('/experience/:id', deleteExperience)

module.exports = router