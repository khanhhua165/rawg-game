import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GenreData } from "../actions/GenreActions";
import { IoCaretDownCircle, IoCaretUpCircle } from "react-icons/io5";

const GenreNav: React.FC<{
  genres: GenreData[];
  queryType: string;
  queryString: string;
}> = ({ genres, queryType, queryString }) => {
  const [isExpend, setIsExpend] = useState<boolean>(false);
  const [genreName, setGenreName] = useState<string>(
    queryType === "genres"
      ? genres.find((genre) => genre.slug === queryString)?.name!
      : "Genre"
  );
  const handleClick = (genre: string) => {
    setIsExpend(false);
    setGenreName(genre);
  };
  const genreList = genres.map((genre) => {
    return (
      <NavLink
        className="flex items-center mb-1 space-x-2 text-gray-900 transition duration-200 bg-gray-300 rounded-lg sm:pr-2 sm:mt-5 sm:mr-4 dark:bg-gray-600 dark:hover:bg-pink-600 hover:text-gray-50 hover:bg-pink-600 dark:text-white"
        key={genre.id}
        to={{
          pathname: "/games",
          search: `?genres=${genre.slug}`,
        }}
        isActive={(match, location) => {
          return (
            location.pathname + location.search ===
            `/games?genres=${genre.slug}`
          );
        }}
        onClick={() => handleClick(genre.name)}
      >
        <div className="w-7 h-7 sm:w-10 sm:h-10">
          <img
            src={genre.image}
            alt={genre.name}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="font-semibold">{genre.name}</div>
      </NavLink>
    );
  });

  return (
    <>
      <div className="flex-wrap items-center justify-center hidden sm:flex">
        {genreList}
      </div>
      <div className="flex flex-col mt-4 sm:hidden dark:text-gray-50">
        <div className="flex items-center mb-1 space-x-2">
          <div className="">{queryType === "genres" ? genreName : "Genre"}</div>
          <div
            className="text-xl cursor-pointer"
            onClick={() => setIsExpend((oldState) => !oldState)}
          >
            {isExpend ? <IoCaretUpCircle /> : <IoCaretDownCircle />}
          </div>
        </div>
        <div className={`${isExpend ? "" : "hidden"} flex flex-col`}>
          {genreList}
        </div>
      </div>
    </>
  );
};

export default GenreNav;
