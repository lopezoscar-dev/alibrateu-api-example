const express = require('express')
const app = express()
const axios = require('axios')
const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather?appid=b1e678cd4eea353040a44e9eaaa70e61&units=metric'
const cache = {}
app.get('/', (req, res) => {
  res.json({
    text: 'hola'
  })
})

app.get('/weather', async (req, res) => {
  console.log('req', req.query)
  if (cache[req.query.city]) {
    console.log('HIT', req.query.city)
    return res.json(cache[req.query.city])
  }
  try {
    const { data } = await axios.post(`${WEATHER_API}&q=${req.query.city}`)
    console.log('data', data)
    cache[req.query.city] = data
    res.json(data)
  } catch (err) {
    return {
      err
    }
  }
})

app.get('/health', (req, res) => {
  res.status(200).end()
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on', process.env.PORT || 3000)
})
