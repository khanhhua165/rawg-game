import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Games from "./Games";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="px-10 mt-4">
        <Header />
      </div>
      {/* <Switch>
        <Redirect from="/" to="/games?genre=action" exact />
        <Redirect from="/games" to="/games?genre=action" exact />
        <Route path="/games" component={Games} />
      </Switch> */}
    </div>
  );
};

export default Layout;
