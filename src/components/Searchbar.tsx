import React, { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Search from "../svgs/Search";
import { getQuery } from "../utils/helpers";

type FormData = {
  gameName: string;
};

const Searchbar: React.FC<RouteComponentProps & { responsive: string }> = ({
  history,
  location,
  responsive,
}) => {
  const gameNameRef = useRef<HTMLInputElement>();
  const { register, handleSubmit } = useForm<FormData>();
  let defVal: string;
  if (location.search !== "") {
    const [queryType, queryString] = getQuery(location.search);
    defVal = queryType === "search" ? queryString : "";
  } else {
    defVal = "";
  }

  const onFormSubmit: SubmitHandler<FormData> = ({ gameName }) => {
    gameNameRef.current?.blur();
    history.push(`/games?search=${gameName}`);
  };
  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className={`relative ${responsive}`}
    >
      <input
        name="gameName"
        ref={(e: HTMLInputElement) => {
          register(e, { required: true });
          gameNameRef.current = e;
        }}
        placeholder="Search Game"
        className="h-8 pl-10 pr-3 transition bg-white w-72 sm:w-64 md:w-96 focus:outline-none rounded-2xl dark:focus:bg-gray-50 dark:hover:bg-gray-50 dark:bg-gray-700 dark:focus:text-black dark:hover:text-black focus:ring-2 focus:ring-pink-600"
        defaultValue={defVal}
      />
      <Search classItems="absolute w-5 h-5 text-pink-500 left-3 bottom-2" />
      <button type="submit"></button>
    </form>
  );
};

export default withRouter(Searchbar);
