const express = require('express')
const app = express()
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')
const PORT = 3000


app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postsRoute)

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(PORT, () => {console.log('!')})