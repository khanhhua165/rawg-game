import React from "react";
import Switch from "react-switch";
import { connect, ConnectedProps } from "react-redux";
import { switchUI } from "../actions/AppActions";
import { RootState } from "../store";
import { getIsLightMode } from "../selectors/AppSelectors";
import Sun from "../svgs/Sun";
import Moon from "../svgs/Moon";

const mapStateToProps = (state: RootState) => {
  return {
    isLightMode: getIsLightMode(state),
  };
};

const mapDispatchToProps = { switchUI };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const UISwitch: React.FC<PropsFromRedux> = (props) => {
  console.log(props.isLightMode);
  return (
    <Switch
      onChange={props.switchUI}
      checked={props.isLightMode}
      onColor="#E5E7EB"
      offColor="#DB2777"
      checkedIcon={false}
      uncheckedIcon={false}
      checkedHandleIcon={<Sun classItems="w-6 h-6" />}
      uncheckedHandleIcon={<Moon classItems="w-6 h-6 dark:text-black" />}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      height={24}
      width={48}
    />
  );
};

export default connector(UISwitch);
