import React from "react";
import { Helmet } from "react-helmet";
import { connect, ConnectedProps } from "react-redux";
import Layout from "./components/Layout";
import { AppState } from "./reducers/AppReducer";

const mapStateToProps = (state: AppState) => {
  return {
    isLightMode: state.isLightMode,
  };
};
type PropsFromRedux = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps);

const App: React.FC<PropsFromRedux> = (props) => {
  const darkMode = props.isLightMode ? "" : "dark";
  const backgroundColor = props.isLightMode ? "#F9FAFB" : "#111827";
  return (
    <div className={`font-serif ${darkMode}`}>
      <Helmet>
        <style>{`body { background-color: ${backgroundColor}; }`}</style>
      </Helmet>
      <Layout />
    </div>
  );
};

export default connector(App);
