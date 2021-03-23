import React from "react";
import { Switch } from "react-router";
import { Redirect, Route } from "react-router-dom";
import Body from "./Body";
import Game from "./Game";
import Navbar from "./Navbar";
import PasswordRecovery from "./PasswordRecovery";
import Searchbar from "./Searchbar";
import Signin from "./Signin";
import Signup from "./Signup";
import UserProfile from "./UserProfile";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex justify-center w-11/12 mx-auto">
        <Searchbar responsive="sm:hidden mt-3" />
      </div>
      <Switch>
        <Route exact path="/">
          <Redirect to="/games" />
        </Route>
        <Route path="/games" exact render={(props) => <Body {...props} />} />
        <Route
          path="/games/:slugName"
          render={(props) => <Game {...props} />}
        />
        <Route exact path="/signup" render={(props) => <Signup {...props} />} />
        <Route exact path="/signin" render={(props) => <Signin {...props} />} />
        <Route
          exact
          path="/password-recovery"
          render={(props) => <PasswordRecovery {...props} />}
        />
        <Route
          exact
          path="/user/:id"
          render={(props) => <UserProfile {...props} />}
        />
      </Switch>
    </div>
  );
};

export default Layout;
