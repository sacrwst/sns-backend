const router = require('express').Router()
const Post = require('../models/post')
const User = require('../models/user')

// create post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    return res.status(200).json('Posted')
  } catch(e) {
    return res.status(500).json('Failed')
  }
})

// update post
router.put('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
  if(post.userId === req.body.userId) {
    await post.updateOne({
      $set: req.body
    })
    return res.status(200).json('Updated')
  } else {
    return res.status(403).json('You cannot update')
  }
})

// delete post
router.delete('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
  if(post.userId === req.body.userId) {
    await post.deleteOne()
    return res.status(200).json('Deleted')
  } else {
    return res.status(403).json('You cannot delete')
  }
})

// get post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    return res.status(200).json(post)
  } catch(e) {
    return res.status(500).json('Failed')
  }
})

// like post
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if(!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: {
          likes: req.body.userId
        }
      })
      return res.status(200).json('Liked')
    } else {
      await post.updateOne({
        $pull: {
          likes: req.body.userId
        }
      })
      return res.status(200).json('Unliked')
    }

  } catch(e) {
    return res.status(500).json('Failed')
  }
})

// get timeline
router.get('/timeline/all', async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId)
    const currentUserPosts = await Post.find({userId: currentUser._id})
    console.log(currentUserPosts)

    const followingUserPosts = await Promise.all(
      currentUser.followings.map(followingUser => {
        return Post.find({userId: followingUser})
      })
    )
    return res.status(200).json(currentUserPosts.concat(...followingUserPosts))
  } catch(e) {
    return res.status(500).json('Failed')
  }
})

module.exports = router