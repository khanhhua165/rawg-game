import React from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Search from "../svgs/Search";
import { getQuery } from "../utils/helpers";

type FormData = {
  gameName: string;
};

const Searchbar: React.FC<RouteComponentProps> = ({ history, location }) => {
  const { register, handleSubmit } = useForm<FormData>();
  let defVal: string;
  if (location.search !== "") {
    const [queryType, queryString] = getQuery(location.search);
    defVal = queryType === "search" ? queryString : "";
  } else {
    defVal = "";
  }

  const onSubmit = ({ gameName }: FormData) => {
    history.push(`/games?search=${gameName}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <input
        name="gameName"
        ref={register({ required: true })}
        placeholder="Search Game"
        className="h-8 pl-10 pr-3 transition bg-white focus:outline-none rounded-2xl w-96 dark:focus:bg-gray-50 dark:hover:bg-gray-50 dark:bg-gray-700 dark:focus:text-black dark:hover:text-black focus:ring-2 focus:ring-pink-600"
        defaultValue={defVal}
      />
      <Search classItems="absolute w-5 h-5 text-pink-500 left-3 bottom-2" />
      <button type="submit"></button>
    </form>
  );
};

export default withRouter(Searchbar);
