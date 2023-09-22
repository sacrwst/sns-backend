const router = require('express').Router()
const User = require('../models/user')

// create a user
router.post('/register', async (req, res) => {
  try {
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })

    const user = newUser.save()
    return res.status(200).json(user)
  } catch(e) {
    return res.status(500).json(e)
  }
})

// login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({'email': req.body.email})
    if(!user) return res.status(404).send('User not found')
    const vailedPassword = req.body.password === user.password
    if(!vailedPassword) return res.status(400).send('Invalid password')
    return res.status(200).json(user)
  } catch(e) {
    return res.status(500).json(e)
  }
})

module.exports = router