const express = require('express')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express()
const port = 3000

weather_api = process.env.OPEN_WEATHER_API_KEY;
ticketmaster_api = process.env.TICKETMASTER_API_KEY;
autocomplete_api = process.env.AUTOCOMPLETE_API_KEY;

app.use(express.json())

function checkResponseStatus(res) {
    if(res.ok){
        return res
    } else {
        throw new Error(`The HTTP status of the reponse: ${res.status} (${res.statusText})`);
    }
}

app.get('/', (req, res) => {
  let return_obj = 
  {
      message: "These are the following endpoints and ways to query them."
            + " Values in all capitals are values sent by frontend",
      endpoints:
      [
          "/weather?q=CITY_NAME",
          "/events?city=CITY_NAME",
          "/autocomplete?input=INPUT_STRING"
      ]
  }

  obj = JSON.stringify(return_obj);
  res.send(return_obj);
})

app.get('/weather', (req, res) => {

    let city = req.query.city
    let country = req.query.country
    console.log(`received weather request for: ${city}`);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${weather_api}`)
        .then(res => res.json())
        .then(json => {            
            res.send(json)
        })
        .catch(err => {
            res.send(error);
            console.log(err)});
})

app.get('/events', (req, res) => {

    let city = req.query.city
    let country = req.query.country
    console.log(`received event request for: ${city}`);

    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketmaster_api}&radius=50&unit=miles&locale=*&city=${city}`)
        .then(checkResponseStatus)
        .then(res => res.json())
        .then(json => {
            names = [];            

            json._embedded.events.forEach(event => {
            
            names.push(`${event.dates.start.localDate}:  ${event.name}`)
            console.log(event.name + event.dates.start.localDate)})
            
            res.send(names);
        })
        .catch(err => console.log(err));
})

app.get('/autocomplete', (req, res) => {

    let city = req.query.city
    let input_string = req.query.input
    console.log(`received event request for: ${city}`);

    fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input_string}&types=(cities)&key=${autocomplete_api}`)
        .then(checkResponseStatus)
        .then(res => res.json())
        .then(json => {
            names = [];            

            json.predictions.forEach(guess => {
            
            names.push(guess.description)

            })
            
            console.log(names);
            res.send(names);
        })
        .catch(err => console.log(err));
})

app.listen(port, () => {
  console.log(`Travel, graphics, and info app listening at http://localhost:${port}`)
})
