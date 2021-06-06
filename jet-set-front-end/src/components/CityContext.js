import { createContext, useContext, useState } from "react";
// import { useHistory } from "react-router-dom";
import { kelvinToFarenheit } from "./Utils";

const CityContext = createContext({
  cityList: [],
  handleNewCity: (city) => {},
  getCityFromUrlString: (url) => {},
  getCityUrl: (city) => {},
  stringToNewCity: (inputString) => {},
  fixCity: (city) => {},
});

export const useCityContext = () => useContext(CityContext);

export const CityProvider = ({ children }) => {
  const [cityList, setCityList] = useState([]);
  // const history = useHistory();

  const stringToNewCity = async (input_string) => {
    if (!input_string) return;
    return fetch(`/cityInfo?input=${input_string}`)
      .then((response) => response.json())
      .then((body) => {
        body = fixCity(body);
        return body;
      })
      .catch((err) => console.log(err));
  };

  const handleNewCity = (newCity) => {
    if (!inCityList(cityList, newCity)) setCityList([newCity, ...cityList]);
  };

  const getCityFromUrlString = async (url) => {
    const cityNameList = url.split("-");
    const foundCity = cityList.find(
      (city) =>
        cityNameList[0] === city.name &&
        cityNameList[1] === city.state &&
        cityNameList[2] === city.country
    );
    if (foundCity) {
      return foundCity;
    } else {
      const newCity = await stringToNewCity(url);
      handleNewCity(newCity);
      return newCity;
    }
  };

  function fixCity(city) {
    const temp = city.weather.main;
    temp.temp = kelvinToFarenheit(temp.temp);
    temp.feels_like = kelvinToFarenheit(temp.feels_like);
    temp.temp_min = kelvinToFarenheit(temp.temp_min);
    temp.temp_max = kelvinToFarenheit(temp.temp_max);
    return city;
  }

  const getCityUrl = (city) => {
    const string = "/" + city.name + "-" + city.state + "-" + city.country;
    console.log("getting city url string: ", string);
    return string;
  };

  return (
    <CityContext.Provider
      value={{
        cityList,
        handleNewCity,
        getCityFromUrlString,
        getCityUrl,
        stringToNewCity,
        fixCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

const inCityList = (cityList, newCity) => {
  if (!newCity) return true;
  if (
    cityList.find(({ name, state, country }) => {
      return (
        name === newCity.name &&
        state === newCity.state &&
        country === newCity.country
      );
    })
  )
    return true;
  else return false;
};
