export function fixCity(city) {
  const temp = city.weather.main;
  temp.temp = kelvinToFarenheit(temp.temp);
  temp.feels_like = kelvinToFarenheit(temp.feels_like);
  temp.temp_min = kelvinToFarenheit(temp.temp_min);
  temp.temp_max = kelvinToFarenheit(temp.temp_max);
  return city;
}

const kelvinToFarenheit = (temp) => Math.round((temp - 273.15) * (9 / 5) + 32);

export const eventsFromCity = (city) => {
    console.log("city argument for eventsFromCity", city)
  return  fetch(
    `/api/events?city=${city.name}&state_code=${city.state}&country_code${city.country}`
  )
    .then((response) => response.json())
    .then((events) => {
      console.log("Event object", events);
      return events;
    })
    .catch((err) => console.log(err));
};
