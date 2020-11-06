import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { SiFlathub } from "react-icons/si";
import SearchContextWrapper from "./customContext/SearchContextWrapper";
import ForecastPage from "./components/pages/ForecastPage";
import MapPage from "./components/pages/MapPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <h1 id="website-title">
        Weather Hub
        <span id="hub">
          <SiFlathub />
        </span>
      </h1>
      <SearchContextWrapper>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/forecast/daily/geo?lat=0&lng=0" />
          </Route>
          <Route path="/forecast/:duration/:searchType" exact>
            <ForecastPage />
          </Route>
          <Route path="/map/:layer" exact>
            <MapPage />
          </Route>
        </Switch>
      </SearchContextWrapper>
    </Router>
  );
}

export default App;
