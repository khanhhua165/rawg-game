import React from "react";
import { Helmet } from "react-helmet-async";
import { connect, ConnectedProps } from "react-redux";
import Layout from "./components/Layout";
import { getIsLightMode } from "./selectors/AppSelectors";
import { RootState } from "./store";

const mapStateToProps = (state: RootState) => {
  return {
    isLightMode: getIsLightMode(state),
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

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
