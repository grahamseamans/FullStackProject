import { CityWrapper } from './components/CityWrapper';
import { SearchBar } from './components/SearchBar';
import './App.css';

const createCity = (name, temperature, wind) => ({ name, temperature, wind });
const mockCityList = [
  createCity("tokyo", 60,  4),
  createCity("dubai", 20, 8),
  createCity("san francisco", 20, 10),
  createCity("los angeles", 100, 30),
  createCity("new york", 100, 1),
  createCity("berlin", 100, 2),
  createCity("paris", 100, 6),
];

function App() {
  return (
    <>
    <SearchBar></SearchBar>
    <CityWrapper cityList={mockCityList}></CityWrapper>
    </>
  );
}

export default App;
