const router = require('express').Router()
const User = require('../models/user')


// update user
router.put('/:id', async (req, res) => {
  if(req.body.userId === req.params.id  || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      })
      res.status(200).json('Updated user')
    } catch(e) {
      return res.status(500).json(e)
    }
  } else {
    return res.status(403).json('You cannot update data.')
  }
})

// delete user
router.delete('/:id', async (req, res) => {
  if(req.body.userId === req.params.id  || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
      res.status(200).json('Deleted user')
    } catch(e) {
      return res.status(500).json(e)
    }
    
  } else {
    return res.status(403).json('You cannot delete data.')
  }
})

// get user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const {password, updatedAt, ...other} = user._doc
    res.status(200).json(other)
  } catch(e) {
    return res.status(500).json(e)
  }
})

// follow user
router.put('/:id/follow', async (req, res)  => {
  if(req.body.userId !== req.params.id) {
    try {

      const targetUser = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)

      if(!targetUser.followers.includes(req.body.userId)) {
        await targetUser.updateOne({
          $push: {
            followers: req.body.userId
          }
        })
        await currentUser.updateOne({
          $push: {
            followings: req.params.id
          }
        })
        res.status(200).json('Followed user')
      } else {
        return res.status(403).json('You are already following')
      }
    } catch(e) {
      return res.status(500).json('Failed')
    }
  } else {
    return res.status(500).json('You cannot follow yourself.')
  }
})
// unfollow user
router.put('/:id/unfollow', async (req, res)  => {
  if(req.body.userId !== req.params.id) {
    try {

      const targetUser = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)

      if(targetUser.followers.includes(req.body.userId)) {
        await targetUser.updateOne({
          $pull: {
            followers: req.body.userId
          }
        })
        await currentUser.updateOne({
          $pull: {
            followings: req.params.id
          }
        })
        res.status(200).json('Unollowed user')
      } else {
        return res.status(403).json('You are already unfollowing')
      }
    } catch(e) {
      return res.status(500).json('Failed')
    }
  } else {
    return res.status(500).json('You cannot unfollow yourself.')
  }
})

module.exports = router