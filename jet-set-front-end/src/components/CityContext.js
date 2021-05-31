import Autocomplete from "@material-ui/lab/Autocomplete";
import { createContext, useContext, useState } from "react";

const CityContext = createContext({
  cityList: [],
  handleNewCity: (city) => {},
  getCityFromUrl: (url) => {},
});

export const useCityContext = () => useContext(CityContext);

export const CityProvider = ({ children }) => {
  const [cityList, setCityList] = useState([]);

  const handleNewCity = (newCity) => {
    console.log("Adding new city", newCity);
    if (!inCityList(cityList, newCity)) setCityList([...cityList, newCity]);
  };
  const getCityFromUrl = (url) => {
    const cityNameList = url.split("-");
    const foundCity = cityList.find(
      (city) =>
        city[0].toLowerCase() === cityNameList.name.toLowerCase() &&
        city[1].toLowerCase() === cityNameList.state.toLowerCase() &&
        city[2].toLowerCase() === cityNameList.country.toLowerCase()
    );
    return foundCity;
  };

  return (
    <CityContext.Provider
      value={{
        cityList,
        handleNewCity,
        getCityFromUrl,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

const inCityList = (cityList, newCity) => {
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
