
export const kelvinToFarenheit = (temp) => Math.round((temp - 273.15) * (9 / 5) + 32);

export const multiDayWeatherFromCity = (city) => {
  return  fetch(
    `/weather?city=${city.name}&state=${city.state}&country${city.country}`
  )
    .then((response) => response.json())
    .then((weather) => {
      return weather;
    })
    .catch((err) => console.log(err));
};

export const eventsFromCity = (city) => {
  return  fetch(
    `/events?city=${city.name}&state_code=${city.state}&country_code${city.country}`
  )
    .then((response) => response.json())
    .then((events) => {
      return events;
    })
    .catch((err) => console.log(err));
};

export function colorsFromTemp(temp) {
  // https://stats.stackexchange.com/questions/281162/scale-a-number-between-a-range
  const maxTemp = 110;
  const minTemp = -10;
  const maxColor = 255;
  const minColor = 0;
  temp += (Math.random() - 1) * 5;
  temp = temp > maxTemp ? maxTemp : temp;
  temp = temp < minTemp ? minTemp : temp;
  let color =
    (maxColor - minColor) * ((temp - minTemp) / (maxTemp - minTemp)) + minColor;
  const avgColor = (maxColor - minColor) / 2;
  color = (color - avgColor) * -1 + avgColor;
  let colorString = "hsl(" + Math.round(color) + ", 100%, 50%)";
  return colorString;
}