import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from './App';
import Episode from './Episode';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><App/></Route>
        <Route exact path="/:id"><Episode/></Route>
        <Route path="*"><h1>Essa rota não existe</h1></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;