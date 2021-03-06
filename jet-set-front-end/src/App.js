import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CityPage } from "./pages/CityPage";
import { CityProvider } from "./components/CityContext";

function App() {
  return (
    <Router>
      <CityProvider>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/:cityIdString">
            <CityPage />
          </Route>
          <Route path="/:cityIdString/events">
            <div>I am a city event page</div>
          </Route>
        </Switch>
      </CityProvider>
    </Router>
  );
}

export default App;
