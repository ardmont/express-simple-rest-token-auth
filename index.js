
const express = require('express')
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
  console.log(req.body)
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
