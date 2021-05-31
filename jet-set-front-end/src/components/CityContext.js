import { createContext, useContext, useState } from "react";

const CityContext = createContext({
  cityList: [],
  handleNewCity: (city) => {},
});

export const useCityContext = () => useContext(CityContext);

export const CityProvider = ({ children }) => {
  const [cityList, setCityList] = useState([]);

  const handleNewCity = (newCity) => {
    console.log("Adding new city", newCity);
    if (!inCityList(cityList, newCity)) setCityList([...cityList, newCity]);
  };

  return (
    <CityContext.Provider
      value={{
        cityList,
        handleNewCity,
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

