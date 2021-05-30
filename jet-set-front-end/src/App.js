import React, { useState } from 'react';
import { CityWrapper } from './components/CityWrapper';
import { NavBar } from './components/NavBar';
import './App.css';

const createCity = (name, temperature, wind) => ({ name, temperature, wind });
const mockCityList = [
  createCity("tokyo", -10, 4),
  createCity("dubai", 10, 8),
  createCity("san francisco", 30, 10),
  createCity("los angeles", 50, 30),
  createCity("new york", 70, 1),
  createCity("berlin", 90, 2),
  createCity("paris", 110, 6),
];

// const handleNewCity = (city) => {
//   // check to make sure we haven't already added the city
//   if (cities.find(({ name, state }) => name === newCity.name && state === newCity.state)) return;
//   if not in (need to change to work with cities with same name,
//   maybe just compare all object fiels, so that we also update weather)
//   setCities([...cities, city]);
// };

// ...
// return (
//   <SearchBar onSubmit={(city) => handleNewCity} {...otherProps} />
//   <CityWrapper cities={cities}/>
// );

function App() {
  const [cityList, setCityList] = useState(mockCityList);
  // const [cityList, setCityList] = useState([]); // how we'll initialize when we have backend hooked up
  // check comment above for example of how to use setCityList in the searchbar
  return (
    <>
      <NavBar cityList={cityList}/>
      <CityWrapper cityList={cityList}></CityWrapper>
    </>
  );
}

export default App;
