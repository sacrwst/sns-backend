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
    required: true,
  },
  coverPicture: {
    type: String,
    required: true,
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