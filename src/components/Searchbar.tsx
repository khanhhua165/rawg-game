import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  gameName: string;
};

const Searchbar: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = ({ gameName }: FormData) => {
    console.log(gameName);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative">
      <input
        name="gameName"
        ref={register({ required: true })}
        placeholder="Search Game"
        className="h-8 pl-10 pr-3 focus:outline-none rounded-2xl w-96 dark:focus:bg-gray-50 dark:hover:bg-gray-50 dark:bg-gray-700 dark:focus:text-black dark:hover:text-black focus:ring-2 focus:ring-pink-600"
      />
      <svg
        className="absolute w-5 h-5 text-pink-500 left-3 bottom-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <button type="submit"></button>
    </form>
  );
};

export default Searchbar;
