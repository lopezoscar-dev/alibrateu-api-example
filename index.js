const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.json({
    text: 'hola'
  })
})

app.get('/health', (req, res) => {
  res.status(200).end()
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on', process.env.PORT || 3000)
})
