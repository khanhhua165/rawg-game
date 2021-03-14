import React from "react";
import { Switch } from "react-router";
import { Redirect, Route } from "react-router-dom";
import Body from "./Body";
import Game from "./Game";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex justify-center w-11/12 mx-auto">
        <Searchbar responsive="sm:hidden mt-3" />
      </div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/games?genres=action" />
        </Route>
        <Route path="/games" exact render={(props) => <Body {...props} />} />
        <Route
          path="/games/:slugName"
          render={(props) => <Game {...props} />}
        />
      </Switch>
    </div>
  );
};

export default Layout;
