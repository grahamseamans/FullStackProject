import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CityPage } from "./pages/CityPage";
import { CityProvider } from "./components/CityContext";

function App() {
  return (
    <CityProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <div>main page</div>
            {/* <HomePage /> */}
          </Route>
          <Route exact path="/:cityIdString">
            <CityPage ></CityPage>
          </Route>
          <Route path="/:cityIdString/events">
            <div>I am a city event page</div>
          </Route>
        </Switch>
      </Router>
    </CityProvider>
  );
}

export default App;
