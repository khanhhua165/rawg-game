type BooleanString = string | undefined | null;

export const toBoolean = (args: BooleanString) => {
  switch (args) {
    case "false":
      return false;
    case "true":
      return true;
    default:
      return true;
  }
};
