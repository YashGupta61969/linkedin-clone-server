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
   about:String,
   posts: [
      {
         caption: String,
         image: String,
      }
   ],
   experiences: [
      {
         companyName: String,
         role: String
      }
   ],
   skills: {
      type: Array,
   },
   followers: {
      type: Array
   },
   following: {
      type: Array
   }
})

const Users = mongoose.model('User', usersSchema)

module.exports = Users