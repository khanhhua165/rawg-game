import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { connect, ConnectedProps } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Games from "./components/Games";
import Layout from "./components/Layout";
import { RootState } from "./store";

const mapStateToProps = (state: RootState) => {
  return {
    isLightMode: state.app.isLightMode,
  };
};
type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps);

const App: React.FC<PropsFromRedux> = (props) => {
  useEffect(() => {
    const fetchGenres = async () => {};
    fetchGenres();
  }, []);
  const darkMode = props.isLightMode ? "" : "dark";
  const backgroundColor = props.isLightMode ? "#F9FAFB" : "#111827";
  return (
    <div className={`font-serif ${darkMode}`}>
      <Helmet>
        <style>{`body { background-color: ${backgroundColor}; }`}</style>
      </Helmet>
      <Layout />
      <Switch>
        <Redirect from="/" to="/games?genre=action" exact />
        <Redirect from="/games" to="/games?genre=action" exact />
        <Route path="/games" component={Games} />
      </Switch>
    </div>
  );
};

export default connector(App);
