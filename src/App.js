import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./pages/Anasayfa";
import Order from "./components/SiparisFormu";
import Success from "./pages/SiparisOnayi";
import "./App.css";

const App = () => {
  return (
    <div>
      <div className="header">
        <img src="../logo.svg" alt="Logo" />
      </div>

      <div className="main-main">
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/pizza">
            <Order />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
export default App;
