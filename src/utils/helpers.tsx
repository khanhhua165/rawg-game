import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaLinux,
  FaApple,
  FaAndroid,
  FaGamepad,
} from "react-icons/fa";
import { SiNintendo, SiAtari, SiSega } from "react-icons/si";
import { HiDesktopComputer } from "react-icons/hi";
import { BiGame } from "react-icons/bi";
import { ToastOptions, ToastPosition } from "react-toastify";
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
  if (!searchString) {
    return ["all", "all"];
  }
  const noQuestion = searchString.slice(1);
  if (noQuestion.indexOf("&") !== -1) {
    return noQuestion.slice(0, noQuestion.indexOf("&")).split("=") as Query;
  }
  return noQuestion.split("=") as Query;
};

const platforms = new Map([
  ["pc", FaWindows],
  ["playstation", FaPlaystation],
  ["xbox", FaXbox],
  ["ios", FaApple],
  ["android", FaAndroid],
  ["mac", FaApple],
  ["linux", FaLinux],
  ["nintendo", SiNintendo],
  ["atari", SiAtari],
  ["commodore-amiga", HiDesktopComputer],
  ["sega", SiSega],
  ["3do", FaGamepad],
  ["neo-geo", BiGame],
  ["web", HiDesktopComputer],
]);

export const getPlatformIcon = (slug: string) => {
  return platforms.get(slug);
};

export const metaColor = (score: number | null) => {
  if ((score as number) >= 75) return "green-400";
  if ((score as number) >= 50) return "yellow-400";
  if ((score as number) >= 25) return "blue-500";
  return "red-500";
};

const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const toDateString = (date: string) => {
  const [year, month, day] = date.split("-") as [string, string, string];
  return `${Months[+month - 1]} ${day}, ${year}`;
};

export const toastOption = (
  position: string = "bottom-right"
): ToastOptions => ({
  position: position as ToastPosition,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});
