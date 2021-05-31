import { createContext, useContext, useState } from "react";

const CityContext = createContext({
  cityList: [],
  handleNewCity: (city) => {},
  getCityFromUrl: (url) => {},
  getCityUrl: (city) => {},
});

export const useCityContext = () => useContext(CityContext);

export const CityProvider = ({ children }) => {
  const [cityList, setCityList] = useState([]);

  const handleNewCity = (newCity) => {
    console.log("Adding new city", newCity);
    if (!inCityList(cityList, newCity)) setCityList([newCity, ...cityList]);
  };

  const getCityFromUrl = (url) => {
    const cityNameList = url.split("-");
    const foundCity = cityList.find(
      (city) =>
        cityNameList[0] === city.name &&
        cityNameList[1] === city.state &&
        cityNameList[2] === city.country
    );
    console.log(foundCity.name);
    return foundCity;
  };
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
        getCityFromUrl,
        getCityUrl,
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
