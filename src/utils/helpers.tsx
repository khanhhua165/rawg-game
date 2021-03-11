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

export type Query = [queryType: string, queryString: string];

export const getQuery = (searchString: string): Query => {
  const noQuestion = searchString.slice(1);
  if (noQuestion.indexOf("&") !== -1) {
    return noQuestion.slice(0, noQuestion.indexOf("&")).split("=") as Query;
  }
  return noQuestion.split("=") as Query;
};
