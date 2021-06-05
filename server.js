const express = require("express");
const fetch = require("node-fetch");
const path = require('path');
var cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;

weather_api = process.env.OPEN_WEATHER_API_KEY;
ticketmaster_api = process.env.TICKETMASTER_API_KEY;
autocomplete_api = process.env.AUTOCOMPLETE_API_KEY;

app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, 'jet-set-front-end/build')));

function checkResponseStatus(res) {
  console.log("checkingResponseStatus for", res)
  if (res.ok) {
    return res;
  } else {
    throw new Error(
      `The HTTP status of the reponse: ${res.status} (${res.statusText})`
    );
  }
}

app.get("/", (req, res) => {
  let return_obj = {
    message:
      "These are the following endpoints and ways to query them." +
      " Values in all capitals are values sent by frontend",
    endpoints: [
      "/weather?q=CITY_NAME",
      "/events?city=CITY_NAME",
      "/autocomplete?input=INPUT_STRING",
    ],
  };
  obj = JSON.stringify(return_obj);
  res.send(return_obj);
});

app.get("/cityInfo", (req, res) => {
  const searchString = req.query.input;
  console.log(`received cityInfo request for: ${searchString}`);
  const newCity = {};
  fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchString}&types=(cities)&key=${autocomplete_api}`
  )
    .then(checkResponseStatus)
    .then((res) => res.json())
    .then((json) => {
      const guessTerms = json.predictions[0].terms;
      if (guessTerms.length === 2) {
        newCity.name = guessTerms[0].value;
        newCity.state = "";
        newCity.country = guessTerms[1].value;
      } else {
        newCity.name = guessTerms[0].value;
        newCity.state = guessTerms[1].value;
        newCity.country = guessTerms[2].value;
      }
      return newCity;
    })
    .then((newCity) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${newCity.name},${newCity.state},${newCity.country}&APPID=${weather_api}`
      )
    )
    .then((res) => res.json())
    .then((weatherResponse) => {
      newCity.weather = weatherResponse;
      res.send(newCity);
    })
    .catch((err) => console.log(err));
});

app.get("/weather", (req, res) => {
  let city = req.query.city;
  let state = req.query.state;
  let country = req.query.country;
  console.log(`received weather request for: ${city}`);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&APPID=${weather_api}`
  )
    .then((res) => res.json())
    .then((json) => {
      res.send(json);
    })
    .catch((err) => {
      res.send(error);
      console.log(err);
    });
});

app.get("/events", (req, res) => {
  let city;
  let state_code;
  let country_code;
  let keyword;

  if (req.query.city) city = "&city=" + req.query.city;
  else city = "";

  if (req.query.state_code) state_code = "&stateCode=" + req.query.state_code;
  else state_code = "";

  if (req.query.country_code)
    country_code = "&countryCode=" + req.query.country_code;
  else country_code = "";

  if (req.query.keyword) keyword = "&keyword=" + req.query.keyword;
  else keyword = "";

  console.log(
    `received event request for: 
    ` +
      `city: ${city}
    ` +
      `state: ${state_code}
    ` +
      `country: ${country_code}
    ` +
      `keyword: ${keyword}`
  );

  fetch(
    `https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketmaster_api}&radius=50&unit=miles` +
      `&locale=*${city}${state_code}${country_code}${keyword}&size=10`
  )
    .then(checkResponseStatus)
    .then((res) => res.json())
    .then((json) => {
      let return_obj = {
        events: [],
      };

      let name;
      let url;
      let date;
      let time;
      let info;
      let price_min;
      let price_max;
      let seatmap_url;
      let venue_name;
      let venue_city;
      let venue_state;
      let venue_country;
      let venue_address;

      if (json.page.totalElements > 0) {
        json._embedded.events.forEach((event) => {
          console.log(event);

          if (event.name !== undefined) name = event.name;
          else name = "";
          if (event.url !== undefined) url = event.url;
          else url = "";
          if (event.dates.start.localDate !== undefined)
            date = event.dates.start.localDate;
          else date = "";
          if (event.dates.start.localTime !== undefined)
            time = event.dates.start.localTime;
          else time = "";
          if (event.info !== undefined) info = event.info;
          else info = "";
          if (event.priceRanges !== undefined)
            price_min = event.priceRanges[0].min;
          else price_min = "";
          if (event.priceRanges !== undefined)
            price_max = event.priceRanges[0].max;
          else price_max = "";
          if (event.seatmap !== undefined)
            seatmap_url = event.seatmap.staticURL;
          else seatmap_url = "";
          if (event._embedded.venues !== undefined)
            venue_name = event._embedded.venues[0].name;
          else venue_name = "";
          if (event._embedded.venues !== undefined)
            venue_city = event._embedded.venues[0].city;
          else venue_city = "";
          if (event._embedded.venues !== undefined)
            venue_state = event._embedded.venues[0].state;
          else venue_state = "";
          if (event._embedded.venues !== undefined)
            venue_country = event._embedded.venues[0].country;
          else venue_country = "";
          if (event._embedded.venues !== undefined)
            venue_address = event._embedded.venues[0].address;
          else venue_address = "";

          let event_object = {
            name: name,
            url: url,
            date: date,
            time: time,
            info: info,
            price_min: price_min,
            price_max: price_max,
            seatmap_url: seatmap_url,
            venue_name: venue_name,
            venue_city: venue_city,
            venue_state: venue_state,
            venue_country: venue_country,
            venue_address: venue_address,
          };

          return_obj.events.push(event_object);
          console.log(event_object);
        });
      }

      console.log(return_obj);
      res.send(JSON.stringify(return_obj));
    })
    .catch((err) => {
      console.log(err);
      res.send(error);
    });
});

app.get("/autocomplete", (req, res) => {
  let input_string = req.query.input;
  console.log(req)
  console.log(`received /autocomplete request for: ${input_string}`);

  fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input_string}&types=(cities)&key=${autocomplete_api}`
  )
    .then(checkResponseStatus)
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
      names = [];
      json.predictions.forEach((guess) => {
        names.push(guess.description);
      });
      res.send(names);
    })
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(
    `Travel, graphics, and info app listening at http://localhost:${port}`
  );
});
