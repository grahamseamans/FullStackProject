const express = require('express')
const cors = require("cors");
const fetch = require('node-fetch')
const bodyParser = require('body-parser');
const { response } = require('express');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 4000

//API keys that get pulled from untracked .env file and loaded in
//to process variables so that they aren't kept in GitHub
weather_api = process.env.OPEN_WEATHER_API_KEY;
ticketmaster_api = process.env.TICKETMASTER_API_KEY;
autocomplete_api = process.env.AUTOCOMPLETE_API_KEY;

app.use(express.json());
app.use(cors());
app.use(express.static('./jet-set-front-end/build'))


//Call back function to check response from API to make
function checkResponseStatus(res) {

    if(res.ok){

        return res

    } else {

        throw new Error(`The HTTP status of the reponse: ${res.status} (${res.statusText})`);

    }

}



//server endpoint point that returns all available endpoints
//along with all of the required input parameters
app.get('/', (req, res) => {

  let return_obj = 

  {

        message: "These are the following endpoints and ways to query them."
               + " Values in brackets parameter values sent by frontend",
        endpoints:
        [
            "/weather?city={city}&state={state}&country={country}",
            "/forecast?city={city}&state={state}&country={country}",
            "/events?city={city}&state={state_code}&country_code={country_code}&keyword={keyword}",
            "/venues?state={state_code}&country_code={country_code}&keyword={keyword}",
            "/event_info?event_id={event_id}",
            "/autocomplete?input={input_string}"
        ]
      
 
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

// app.get("/weather", (req, res) => {
//   let city = req.query.city;
//   let state = req.query.state;
//   let country = req.query.country;
//   console.log(`received weather request for: ${city}`);

//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&APPID=${weather_api}`
//   )
//     .then((res) => res.json())
//     .then((json) => {
//       res.send(json);
//     })
//     .catch((err) => {
//       res.send(error);
//       console.log(err);
//     });
// });

// app.get("/events", (req, res) => {
//   let city;
//   let state_code;
//   let country_code;
//   let keyword;

//   if (req.query.city) city = "&city=" + req.query.city;
//   else city = "";

//   if (req.query.state_code) state_code = "&stateCode=" + req.query.state_code;
//   else state_code = "";

//   if (req.query.country_code)
//     country_code = "&countryCode=" + req.query.country_code;
//   else country_code = "";

//   if (req.query.keyword) keyword = "&keyword=" + req.query.keyword;
//   else keyword = "";

//   console.log(
//     `received event request for: 
//     ` +
//       `city: ${city}
//     ` +
//       `state: ${state_code}
//     ` +
//       `country: ${country_code}
//     ` +
//       `keyword: ${keyword}`
//   );

//   fetch(
//     `https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketmaster_api}&radius=50&unit=miles` +
//       `&locale=*${city}${state_code}${country_code}${keyword}&size=10`
//   )
//     .then(checkResponseStatus)
//     .then((res) => res.json())
//     .then((json) => {
//       let return_obj = {
//         events: [],
//       };

//       let name;
//       let url;
//       let date;
//       let time;
//       let info;
//       let price_min;
//       let price_max;
//       let seatmap_url;
//       let venue_name;
//       let venue_city;
//       let venue_state;
//       let venue_country;
//       let venue_address;

//       if (json.page.totalElements > 0) {
//         json._embedded.events.forEach((event) => {
//           console.log(event);

//           if (event.name !== undefined) name = event.name;
//           else name = "";
//           if (event.url !== undefined) url = event.url;
//           else url = "";
//           if (event.dates.start.localDate !== undefined)
//             date = event.dates.start.localDate;
//           else date = "";
//           if (event.dates.start.localTime !== undefined)
//             time = event.dates.start.localTime;
//           else time = "";
//           if (event.info !== undefined) info = event.info;
//           else info = "";
//           if (event.priceRanges !== undefined)
//             price_min = event.priceRanges[0].min;
//           else price_min = "";
//           if (event.priceRanges !== undefined)
//             price_max = event.priceRanges[0].max;
//           else price_max = "";
//           if (event.seatmap !== undefined)
//             seatmap_url = event.seatmap.staticURL;
//           else seatmap_url = "";
//           if (event._embedded.venues !== undefined)
//             venue_name = event._embedded.venues[0].name;
//           else venue_name = "";
//           if (event._embedded.venues !== undefined)
//             venue_city = event._embedded.venues[0].city;
//           else venue_city = "";
//           if (event._embedded.venues !== undefined)
//             venue_state = event._embedded.venues[0].state;
//           else venue_state = "";
//           if (event._embedded.venues !== undefined)
//             venue_country = event._embedded.venues[0].country;
//           else venue_country = "";
//           if (event._embedded.venues !== undefined)
//             venue_address = event._embedded.venues[0].address;
//           else venue_address = "";

//           let event_object = {
//             name: name,
//             url: url,
//             date: date,
//             time: time,
//             info: info,
//             price_min: price_min,
//             price_max: price_max,
//             seatmap_url: seatmap_url,
//             venue_name: venue_name,
//             venue_city: venue_city,
//             venue_state: venue_state,
//             venue_country: venue_country,
//             venue_address: venue_address,
//           };

//           return_obj.events.push(event_object);
//           console.log(event_object);
//         });
//       }

//       console.log(return_obj);
//       res.send(JSON.stringify(return_obj));
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send(error);
//     });
// });

// app.get("/autocomplete", (req, res) => {
//   let city = req.query.city;
//   console.log(req.query.input);
//   let input_string = req.query.input;
//   console.log(`received /autocomplete request for: ${city}`);

//   fetch(
//     `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input_string}&types=(cities)&key=${autocomplete_api}`
//   )
//     .then(checkResponseStatus)
//     .then((res) => res.json())
//     .then((json) => {
//       names = [];
//       json.predictions.forEach((guess) => {
//         names.push(guess.description);
//       });
//       res.send(names);
//     })
//     .catch((err) => console.log(err));
// });
// })



//endpoint to get current weather from an API call to openweather.org
//The endpoint expects the parameters of city, state, and country to be
//sent by the frontend, but it does a data validation check and will just
//change the parameter to an empty string in the API call, if it isn't present
//in the frontend parameter that is sent.  Only city is a required parameter, but
//there is no guarantee that the right city data will be fetched, but in most cases it
//will.  The call is being piggybacked with the google autocomplete call first
//grabbing the full city,state,country string, and then verifying with the user and using 
//it's values for the weather API call
/*
JSON return object example:
   "coord": {
        "lon": -122.6762,
        "lat": 45.5234
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 293.31,
        "feels_like": 293.31,
        "temp_min": 290.11,
        "temp_max": 295.89,
        "pressure": 1013,
        "humidity": 74
    },
    "visibility": 10000,
    "wind": {
        "speed": 0.89,
        "deg": 351,
        "gust": 2.24
    },
    "clouds": {
        "all": 1
    },
    "dt": 1622644661,
    "sys": {
        "type": 2,
        "id": 2008548,
        "country": "US",
        "sunrise": 1622636684,
        "sunset": 1622692388
    },
    "timezone": -25200,
    "id": 5746545,
    "name": "Portland",
    "cod": 200
*/

app.get('/weather', (req, res) => {

    let city;
    let country;
    let state;

    if(req.query.city !== undefined)
        city = req.query.city
    else
        city = ""

    if(req.query.city !== undefined)
        country = req.query.country
    else
        country = ""

    if(req.query.city !== undefined)
        state = req.query.state
    else
        state = ""
    console.log(`received weather request for: ${city}`);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&APPID=${weather_api}`)
        .then(checkResponseStatus)
        .then(res => res.json())
        .then(json => {            
            res.send(json)
        })
        .catch(err => {
            res.send(err);
            console.log(err)});
})



//endpoint to get current weather forecast from an API call to openweather.org
//The endpoint expects the parameters of city, state, and country to be
//sent by the frontend, but it does a data validation check and will just
//change the parameter to an empty string in the API call, if it isn't present
//in the frontend parameter that is sent.  Only city is a required parameter, but
//there is no guarantee that the right city data will be fetched, but in most cases it
//will.  The call is being piggybacked with the google autocomplete call first
//grabbing the full city,state,country string, and then verifying with the user and using 
//it's values for the weather API call.  The forecast is returned for 5 days worth of data
//in 3 hour step increments for an array size of 40 items.
/*
JSON return object:

{
    "cod": "200",
    "message": 0,
    "cnt": 40,
    "list": [
        {
            "dt": 1622754000,
            "main": {
                "temp": 292.28,
                "feels_like": 292.02,
                "temp_min": 290.59,
                "temp_max": 292.28,
                "pressure": 1020,
                "sea_level": 1020,
                "grnd_level": 1018,
                "humidity": 68,
                "temp_kf": 1.69
            },
            "weather": [
                {
                    "id": 803,
                    "main": "Clouds",
                    "description": "broken clouds",
                    "icon": "04n"
                }
            ],
            "clouds": {
                "all": 69
            },
            "wind": {
                "speed": 1.84,
                "deg": 283,
                "gust": 3.79
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "n"
            },
            "dt_txt": "2021-06-03 21:00:00"
        },
        ...
    ],
    "city": {
        "id": 2643743,
        "name": "London",
        "coord": {
            "lat": 51.5073,
            "lon": -0.1276
        },
        "country": "GB",
        "population": 1000000,
        "timezone": 3600,
        "sunrise": 1622692056,
        "sunset": 1622751006
    }
}
*/
app.get('/forecast', (req, res) => {

    let city;
    let country;
    let state;

    if(req.query.city !== undefined)
        city = req.query.city
    else
        city = ""

    if(req.query.city !== undefined)
        country = req.query.country
    else
        country = ""

    if(req.query.city !== undefined)
        state = req.query.state
    else
        state = ""

    console.log(`received forecast request for: ${city}`);

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&${state}&${country}&APPID=${weather_api}`)
        .then(checkResponseStatus)
        .then(res => res.json())
        .then(json => {            
            res.send(json)
        })
        .catch(err => {
            res.send(err);
            console.log(err)});
})

//This is an endpoint that accesses the ticketmaster event API call.
//It expects the parameters from the frontend of city, tate_code,
//country_code, and keyword(type of event, such as "music", "sports",
//etc.).  It then returns an array of 10 events from the chosen city
//that has data condensced down to per event.
/*
JSON return object:

events: [
    {
        name:
        url:
        date:
        time:
        info:
        price_min:
        price_max:
        seatmap_url:
        venue_name:
        venue_city:
        venue_state:
        venue_country:
        venue_address:
    },
    ...
]
*/
app.get('/events', (req, res) => {

    let city;
    let state_code;
    let country_code;
    let keyword;
    
    if(req.query.city)
        city = "&city=" + req.query.city;
    else
        city = '';

    if(req.query.state_code)
        state_code = "&stateCode=" + req.query.state_code
    else
        state_code = '';

    if(req.query.country_code)
        country_code = "&countryCode=" + req.query.country_code
    else
        country_code = '';

    if(req.query.keyword)
        keyword = "&keyword=" + req.query.keyword
    else
        keyword = '';
    
    console.log(`received event request for: 
    ` + `city: ${city}
    ` + `state: ${state_code}
    ` + `country: ${country_code}
    ` + `keyword: ${keyword}`);

    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketmaster_api}&radius=50&unit=miles`
           + `&locale=*${city}${state_code}${country_code}${keyword}&size=10`)
        .then(checkResponseStatus)
        .then(res => res.json())
        .then(json => {

            let return_obj = {
                events: []            
            }

            let name;
            let url;
            let id;
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

            if(json.page.totalElements > 0)
            {
                json._embedded.events.forEach(event => {
            
                console.log(event);

                if(event.name !== undefined)
                    name = event.name;
                else
                    name = '';
                if(event.url !== undefined)
                    url = event.url;
                else
                    url = '';
                if(event.id !== undefined)
                    id = event.id;
                else
                    id = '';    
                if(event.dates.start.localDate !== undefined)
                    date = event.dates.start.localDate;
                else
                    date = '';
                if(event.dates.start.localTime !== undefined)
                    time = event.dates.start.localTime;
                else
                    time = '';
                if(event.info !== undefined)
                    info = event.info;
                else
                    info = '';
                if(event.priceRanges !== undefined)
                    price_min = event.priceRanges[0].min;
                else
                    price_min = '';
                if(event.priceRanges !== undefined)
                    price_max = event.priceRanges[0].max;
                else
                    price_max = '';
                if(event.seatmap !== undefined)
                    seatmap_url = event.seatmap.staticURL;
                else
                    seatmap_url = '';
                if(event._embedded.venues !== undefined)
                    venue_name = event._embedded.venues[0].name;
                else
                    venue_name = '';
                if(event._embedded.venues !== undefined)
                    venue_city = event._embedded.venues[0].city;
                else
                    venue_city = '';
                if(event._embedded.venues !== undefined)
                    venue_state = event._embedded.venues[0].state;
                else
                    venue_state = '';
                if(event._embedded.venues !== undefined)
                    venue_country = event._embedded.venues[0].country
                else
                    venue_country = '';
                if(event._embedded.venues !== undefined)
                    venue_address = event._embedded.venues[0].address;
                else
                    venue_address = '';

                let event_object  = {
                    name: name,
                    url: url,
                    id: id,
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
                    venue_address: venue_address
                }

                return_obj.events.push(event_object)
                console.log(event_object)})
            }
          
            console.log(return_obj);
            res.send(JSON.stringify(return_obj));
        })
        .catch(err => {
            console.log(err);
            res.send(err)});
})

//This is an endpoint to use the google places autocomplete API.
//It takes an input string from the frontend, which is the users typed
//guess for the city that they want to look up.  This string is then
//communicate to the Google API, which sends back an array of predictions
//for what city that they meant, which the frontend can use to verify with
//the user the actual city.  The predicitons return object will be an array
//of "city, state, country" strings, but in some cases, the state isn't present
//or commas are missing.
/*
JSON return object example:
[
    "Portland, OR, USA",
    "Portland, ME, USA",
    "Portland, TN, USA",
    "Portland, TX, USA",
    "Portland, IN, USA"
]
*/
app.get('/autocomplete', (req, res) => {

    let city = req.query.city
    let input_string = req.query.input
    console.log(`received event request for: ${city}`);

    fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input_string}&types=(cities)&key=${autocomplete_api}`)
        .then(checkResponseStatus)
        .then(res => res.json())
        .then(json => {

            let names = [];            

            json.predictions.forEach(guess => {
            
                names.push(guess.description)

            })
            
            console.log(names);
            res.send(names);
        })
        .catch(err => {
            console.log(err)
            res.send(err)});
})

//This is an endpoint that accesses the ticketmaster venue API call.
//It expects the parameters from the frontend of state_code,
//country_code, and keyword(type of event, such as "music", "sports",
//etc.).  It then returns an array of 20 venues from the chosen state
//that has data condensced down to per venue.
/*
JSON return object:

venues: [
    {
        name:
        url:
        postalCode:
        city:
        state:
        country:
        address:
    },
    ...
]
*/
app.get('/venues', (req, res) => {

    let state_code;
    let keyword;
    let country_code;

    if(req.query.state_code)
        state_code = "&stateCode=" + req.query.state_code
    else
        state_code = '';

    if(req.query.country_code)
        country_code = "&countryCode=" + req.query.country_code
    else
        country_code = '';

    if(req.query.keyword)
        keyword = "&keyword=" + req.query.keyword
    else
        keyword = '';
    
    console.log(`received venues request for: 
    ` + `state: ${state_code}
    ` + `country: ${country_code}
    ` + `keyword: ${keyword}`);
    https://app.ticketmaster.com/discovery/v2/venues?&countryCode=US&stateCode=OR
    fetch(`https://app.ticketmaster.com/discovery/v2/venues?apikey=${ticketmaster_api}`
           + `${keyword}&radius=10&unit=miles&locale=*&size=20${country_code}${state_code}`)
        .then(checkResponseStatus)
        .then(res => res.json())
        .then(json => {

            let return_obj = {
                venues: []            
            }

            let name;
            let url;
            let postalCode;
            let city;
            let state;
            let country;
            let address;

            if(json.page.totalElements > 0)
            {
                json._embedded.venues.forEach(venue => {
            
                console.log(venue);

                if(venue.name !== undefined)
                    name = venue.name;
                else
                    name = '';
                if(venue.url !== undefined)
                    url = venue.url;
                else
                    url = '';
                if(venue.postalCode !== undefined)
                    postalCode = venue.postalCode;
                else
                    postalCode = '';
                if(venue.city.name !== undefined)
                    city = venue.city.name;
                else
                    city = '';
                if(venue.state.name !== undefined)
                    state = venue.state.name;
                else
                    state = '';
                if(venue.country.name !== undefined)
                    country = venue.country.name;
                else
                    country = '';
                if(venue.address.line1 !== undefined)
                    address = venue.address.line1;
                else
                    address = '';                

                let venue_object  = {
                    name: name,
                    url: url,
                    postalCode: postalCode,
                    city: city,
                    state: state,
                    country: country,
                    address: address
                }

                return_obj.venues.push(venue_object)
                console.log(venue_object)})
            }
          
            console.log(return_obj);
            res.send(JSON.stringify(return_obj));
        })
        .catch(err => {
            console.log(err);
            res.send(err)});
})

//The endpoint returns data about a specific event that is looked up by
//its id parameter that can be found from previous event queries, so that
//an individual event data can be returned.  the only parameter that has to
//be sent in to the endpoint is the the event id.
/*
JSON return object:
    {
        name:
        url:
        date:
        time:
        price_min:
        price_max:
        seatmap_url:
        venue_name:
        venue_city:
        venue_state:
        venue_country:
        venue_address:
    }
*/
app.get('/event_info', (req, res) => {

    let event_id;
    
    if(req.query.event_id)
        event_id = req.query.event_id;
    else
        event_id = '';

   
    console.log(`received event request for: 
    ` + `event_id: ${event_id}`);

    fetch(`https://app.ticketmaster.com/discovery/v2/events/${event_id}?apikey=${ticketmaster_api}`)
        .then(checkResponseStatus)
        .then(res => res.json())
        .then(json => {

            let name;
            let url;
            let date;
            let time;
            let price_min;
            let price_max;
            let seatmap_url;
            let venue_name;
            let venue_city;
            let venue_state;
            let venue_country;
            let venue_address;

            if(json.id === event_id)
            {
                          
                console.log(json);

                if(json.name !== undefined)
                    name = json.name;
                else
                    name = '';
                if(json.url !== undefined)
                    url = json.url;
                else
                    url = '';
                if(json.dates.start.localDate !== undefined)
                    date = json.dates.start.localDate;
                else
                    date = '';
                if(json.dates.start.localTime !== undefined)
                    time = json.dates.start.localTime;
                else
                    time = '';
                if(json.priceRanges !== undefined)
                    price_min = json.priceRanges[0].min;
                else
                    price_min = '';
                if(json.priceRanges !== undefined)
                    price_max = json.priceRanges[0].max;
                else
                    price_max = '';
                if(json.seatmap !== undefined)
                    seatmap_url = json.seatmap.staticURL;
                else
                    seatmap_url = '';
                if(json._embedded.venues !== undefined)
                    venue_name = json._embedded.venues[0].name;
                else
                    venue_name = '';
                if(json._embedded.venues !== undefined)
                    venue_city = json._embedded.venues[0].city.name;
                else
                    venue_city = '';
                if(json._embedded.venues !== undefined)
                    venue_state = json._embedded.venues[0].state.name;
                else
                    venue_state = '';
                if(json._embedded.venues !== undefined)
                    venue_country = json._embedded.venues[0].country.name
                else
                    venue_country = '';
                if(json._embedded.venues !== undefined)
                    venue_address = json._embedded.venues[0].address.line1;
                else
                    venue_address = '';

                let event_object  = {
                    name: name,
                    url: url,
                    date: date,
                    time: time,
                    price_min: price_min,
                    price_max: price_max,
                    seatmap_url: seatmap_url,
                    venue_name: venue_name,
                    venue_city: venue_city,
                    venue_state: venue_state,
                    venue_country: venue_country,
                    venue_address: venue_address
                }

                console.log(event_object)
                res.send(JSON.stringify(event_object));
            }
            else
            {
                res.send(JSON.stringify({
                    message: "The event id was not for a valid event"
                }))
            }
        })
        .catch(err => {
            console.log(err);
            res.send(err)});
})

//starts server at the specified port, which is local:host:3000 for dev purposes.
app.listen(port, () => {
  console.log(`Travel, graphics, and info app listening at http://localhost:${port}`)
})

