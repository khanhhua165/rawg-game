import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { connect, ConnectedProps } from "react-redux";
import Layout from "./components/Layout";
import {
  SCREEN_LG,
  SCREEN_MB,
  SCREEN_MD,
  SCREEN_SM,
} from "./constants/screenSize";
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
  useEffect(() => {
    const mbDevice = window.matchMedia(`(max-width: ${SCREEN_SM - 1}px)`);
    const smDevice = window.matchMedia(
      `(min-width: ${SCREEN_SM}px) and (max-width: ${SCREEN_MD - 1}px)`
    );
    const medDevice = window.matchMedia(
      `(min-width: ${SCREEN_MD}px) and (max-width: ${SCREEN_LG - 1}px)`
    );
    const lgDevice = window.matchMedia(`(min-width: ${SCREEN_LG})`);
    const handleScreensizeChange = () => {
      if (mbDevice.matches) {
      }
    };
    return () => {};
  }, []);
  const darkMode = props.isLightMode ? "" : "dark";
  const backgroundColor = props.isLightMode ? "#F3F4F6" : "#111827";
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
