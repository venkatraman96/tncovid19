
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Covid from "layouts/Covid.js";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/config/store";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

export const rootComponent = (
  <Provider store={store}>
    <BrowserRouter>
    <Router history={hist}>
    <Switch>
      <Route path="/covid" component={Covid} />
      <Redirect from="/" to="/covid/dashboard" />
    </Switch>
  </Router>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  rootComponent,
  document.getElementById("root")
);
