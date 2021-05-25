const express = require('express')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express()
const port = 3000

weather_api = process.env.OPEN_WEATHER_API_KEY;
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/weather', (req, res) => {

    let city = req.body.city;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${weather_api}`)
    .then(res => res.json())
    .then(json => {
        res.send(json)
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
