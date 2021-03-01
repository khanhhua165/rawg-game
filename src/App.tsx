import React from "react";
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
  return (
    <div className={`font-serif ${darkMode}`}>
      <Layout />
    </div>
  );
};

export default connector(App);
