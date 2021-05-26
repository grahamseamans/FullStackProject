const express = require('express')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express()
const port = 3000

weather_api = process.env.OPEN_WEATHER_API_KEY;
ticketmaster_api = process.env.TICKETMASTER_API_KEY;
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/weather', (req, res) => {

    let city = req.query.city
    let country = req.query.country

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${weather_api}`)
    .then(res => res.json())
    .then(json => {
        res.send(json)
    })
})

app.get('/events', (req, res) => {

    let city = req.query.city
    let country = req.query.country
    console.log(city);

    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketmaster_api}&radius=50&unit=miles&locale=*&city=${city}`)
    .then(res => res.json())
    .then(json => {
        names = [];
        
        json._embedded.events.forEach(event => {
            //console.log(event);
            names.push(`${event.dates.start.localDate}:  ${event.name}`)
            console.log(event.name + event.dates.start.localDate)})
        //console.log(json._embedded.events);
        res.send(names);
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
