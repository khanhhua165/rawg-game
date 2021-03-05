import React from "react";
import Switch from "react-switch";
import { connect, ConnectedProps } from "react-redux";
import { switchUI } from "../actions/AppActions";
import { RootState } from "../store";

const mapStateToProps = (state: RootState) => {
  return {
    isLightMode: state.app.isLightMode,
  };
};

const mapDispatchToProps = { switchUI };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const UISwitch: React.FC<PropsFromRedux> = (props) => {
  return (
    <Switch
      onChange={props.switchUI}
      checked={props.isLightMode}
      onColor="#E5E7EB"
      offColor="#DB2777"
      checkedIcon={false}
      uncheckedIcon={false}
      checkedHandleIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      }
      uncheckedHandleIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 dark:text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      }
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      height={24}
      width={48}
    />
  );
};

export default connector(UISwitch);
