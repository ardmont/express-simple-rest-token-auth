const healthcheck = require('./healthcheck')

const env = process.env.NODE_ENV || 'development'
require('dotenv').config({ path: `.env.${env}` })
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express()
const port = 3000

const helmet = require('helmet')
app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/signin', (req, res) => {
  const { User } = require('./models')
  User.findOne({
    where: {
      email: req.body.email
    },
    raw: true
  }).then((user) => {
    if (user === null || !bcrypt.compareSync(req.body.password, user.password)) {
      throw new Error('Invalid user or password')
    }
    delete user.password

    const token = jwt.sign(user, process.env.JWT_SECRET, { algorithm: 'HS512', expiresIn: '1 hours' })

    res.set('Authorization', `Bearer ${token}`).send(user)
  }).catch((e) => {
    res.status(401).send({ message: e.message })
  })
})

healthcheck.then(() => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})
  .catch(err => {
    console.error(err)
  })
