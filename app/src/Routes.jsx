import React from "react";
import {
  Route
} from 'react-router-dom'
import App from "./App";
import Add from "./Add";
import View from "./View";

const Routes = (
  <Route path="/" component={ App }>
    <Route path="/view" component={ View } />
    <Route path="/add" component={ Add } />
    <Route path="/add(/:key)" component={ Add } />
  </Route>
);

export default Routes;
