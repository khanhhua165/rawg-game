import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { connect, ConnectedProps } from "react-redux";
import Layout from "./components/Layout";
import { getIsLightMode } from "./selectors/AppSelectors";
import { RootState } from "./store";
import { switchAuthState } from "./actions/UserActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mapStateToProps = (state: RootState) => {
  return {
    isLightMode: getIsLightMode(state),
  };
};
const mapDispatchToProps = {
  switchAuthState,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const App: React.FC<PropsFromRedux> = ({ isLightMode, switchAuthState }) => {
  useEffect(() => {
    const unsubscriber = switchAuthState();
    return unsubscriber;
  }, [switchAuthState]);
  const darkMode = isLightMode ? "" : "dark";
  const backgroundColor = isLightMode ? "#F3F4F6" : "#111827";
  return (
    <div className={`font-serif ${darkMode}`}>
      <Helmet>
        <style>{`body { background-color: ${backgroundColor}; }`}</style>
      </Helmet>
      <Layout />
      <ToastContainer />
    </div>
  );
};

export default connector(App);
