import { CityWrapper } from './components/CityWrapper';
import { NavBar } from './components/NavBar';
import './App.css';

const createCity = (name, temperature, wind) => ({ name, temperature, wind });
const mockCityList = [
  createCity("tokyo", -10,  4),
  createCity("dubai", 10, 8),
  createCity("san francisco", 30, 10),
  createCity("los angeles", 50, 30),
  createCity("new york", 70, 1),
  createCity("berlin", 90, 2),
  createCity("paris", 110, 6),
];

// const handleNewCity = (city) => {
//   // check to make sure we haven't already added the city
//   if (cities.find(({ name }) => name !== city.name)) return; 
//   if not in (need to change to work with cities with same name, 
//   maybe just compare all object fiels)
//   setCities([...cities, city]);
// };

// ...
// render (
//   <SearchBar onSubmit={(city) => handleNewCity} {...otherProps} />
//   <CityWrapper cities={cities}/>
// );

function App() {
  return (
    <>
    <NavBar />
    <CityWrapper cityList={mockCityList}></CityWrapper>
    </>
  );
}

export default App;
