const mongoose = require('mongoose')
const PostScheme = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
  likes: {
    type: Array,
    defualt: []
  },
}, {timestamps: true})

module.exports = mongoose.model('Post', PostScheme)