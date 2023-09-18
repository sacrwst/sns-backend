const mongoose = require('mongoose')
const UserScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  coverPicture: {
    type: String,
  },
  followers: {
    type: Array,
    defualt: []
  },
  followings: {
    type: Array,
    defualt: []
  },
  isAdmin: {
    type: Boolean,
    defualt: false
  },
  desc: {
    type: String,
  },
  city: {
    type: String,
  }
}, {timestamps: true})

module.exports = mongoose.model('User', UserScheme)