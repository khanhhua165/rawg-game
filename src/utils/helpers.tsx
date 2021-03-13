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
