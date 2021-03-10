import React from "react";
import { Switch } from "react-router";
import { Redirect, Route } from "react-router-dom";
import Body from "./Body";
import Game from "./Game";
import Navbar from "./Navbar";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/games?genres=action" />
        </Route>
        <Route path="/games" render={(props) => <Body {...props} />} />
        <Route
          path="/games/:gameName"
          render={(props) => <Game {...props} />}
        />
      </Switch>
    </div>
  );
};

export default Layout;
