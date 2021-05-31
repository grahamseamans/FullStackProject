import React, { useState } from 'react';
import { CityWrapper } from './components/CityWrapper';
import { NavBar } from './components/NavBar';
import './App.css';

// const createCity = (name, temperature, wind) => ({ name, temperature, wind });
// const mockCityList = [
//   createCity("tokyo", -10, 4),
//   createCity("dubai", 10, 8),
//   createCity("san francisco", 30, 10),
//   createCity("los angeles", 50, 30),
//   createCity("new york", 70, 1),
//   createCity("berlin", 90, 2),
//   createCity("paris", 110, 6),
// ];

// ...
// return (
//   <SearchBar onSubmit={(city) => handleNewCity} {...otherProps} />
//   <CityWrapper cities={cities}/>
// );

function App() {
  const [cityList, setCityList] = useState([]);

  const handleNewCity = (newCity) => {
    console.log("Adding new city", newCity);
    if (cityList.find(({ name: { name, state } }) => {
      return name === newCity.name.name && state === newCity.name.state;
    }))
      return
    console.log(newCity);
    setCityList([...cityList, newCity]);
  };
  return (
    <>
      <NavBar handleNewCity={handleNewCity} />
      <CityWrapper cityList={cityList}></CityWrapper>
    </>
  );
}

export default App;
