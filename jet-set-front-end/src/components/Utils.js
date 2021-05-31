export function fixCity(city) {
    const temp = city.weather.main
    temp.temp = kelvinToFarenheit(temp.temp)
    temp.feels_like = kelvinToFarenheit(temp.feels_like)
    temp.temp_min = kelvinToFarenheit(temp.temp_min)
    temp.temp_max = kelvinToFarenheit(temp.temp_max)
    return city
}

const kelvinToFarenheit = (temp) => Math.round((temp - 273.15) * (9 / 5) + 32);