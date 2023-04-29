const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   image: String,
   about: String,
   posts: [
      {
         caption: String,
         image: String,
         likedBy: [String]
      }
   ],
   experiences: [
      {
         companyName: String,
         duration:String,
         role: String
      }
   ],
   skills: [String],
   followers: [String],
   following: [String]
})

const Users = mongoose.model('User', usersSchema)

module.exports = Users