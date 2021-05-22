import { CityWrapper } from './components/CityWrapper';
import { SearchBar } from './components/SearchBar';
import './App.css';

const createCity = (name, temperature) => ({ name, temperature });
const mockCityList = [
  createCity("tokyo", 100),
  createCity("dubai", 100),
  createCity("san francisco", 100),
  createCity("los angeles", 100),
  createCity("new york", 100),
  createCity("berlin", 100),
  createCity("paris", 100),
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
