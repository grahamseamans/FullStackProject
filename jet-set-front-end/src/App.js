import { CityWrapper } from './components/CityWrapper';
import { NavBar } from './components/NavBar';
import './App.css';

const createCity = (name, temperature, wind) => ({ name, temperature, wind });
const mockCityList = [
  createCity("tokyo", -10,  4),
  createCity("dubai", 110, 8),
  createCity("san francisco", 50, 10),
  createCity("los angeles", 98, 30),
  createCity("new york", 90, 1),
  createCity("berlin", 60, 2),
  createCity("paris", 75, 6),
];

function App() {
  return (
    <>
    <NavBar />
    <CityWrapper cityList={mockCityList}></CityWrapper>
    </>
  );
}

export default App;
