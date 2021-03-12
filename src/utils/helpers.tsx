import {
  SCREEN_LG,
  SCREEN_MD,
  SCREEN_SM,
  SCREEN_XL,
} from "../constants/screenSize";

type BooleanString = string | undefined | null;

export const toBoolean = (args: BooleanString) => {
  switch (args) {
    case "false":
      return false;
    case "true":
      return true;
    default:
      return false;
  }
};

export type Query = [queryType: string, queryString: string];

export const getQuery = (searchString: string): Query => {
  const noQuestion = searchString.slice(1);
  if (noQuestion.indexOf("&") !== -1) {
    return noQuestion.slice(0, noQuestion.indexOf("&")).split("=") as Query;
  }
  return noQuestion.split("=") as Query;
};

export const getScreenSize = () => {
  const smDevice = window.matchMedia(`(min-width: ${SCREEN_SM}px)`);
  const medDevice = window.matchMedia(`(min-width: ${SCREEN_LG}px)`);
  const lgDevice = window.matchMedia(`(min-width: ${SCREEN_MD}px)`);
  if (lgDevice.matches) return "lg";
  if (medDevice.matches) return "md";
  if (smDevice.matches) return "sm";
  else return "mb";
};
