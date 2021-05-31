import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CityProvider } from "./components/CityContext";

function App() {
  return (
    <CityProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/:id">
            <div>I am a city page</div>
          </Route>
          <Route path="/:id/events">
            <div>I am a city event page</div>
          </Route>
        </Switch>
      </Router>
    </CityProvider>
  );
}

export default App;
