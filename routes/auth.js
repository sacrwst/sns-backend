const router = require('express').Router()
const User = require('../models/user')

// register a user
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

module.exports = router