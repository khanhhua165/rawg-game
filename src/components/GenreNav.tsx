import React from "react";
import { NavLink } from "react-router-dom";
import { GenreData } from "../actions/GenreActions";

const GenreNav: React.FC<{ genres: GenreData[] }> = ({ genres }) => {
  const genreList = genres.map((genre) => {
    return (
      <NavLink
        className="flex items-center pr-2 mt-5 mr-4 space-x-2 text-gray-900 transition duration-200 bg-gray-300 rounded-lg dark:bg-gray-600 dark:hover:bg-pink-600 hover:text-gray-50 hover:bg-pink-600 dark:text-white"
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
      >
        <div className="w-10 h-10">
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
    <div className="flex flex-wrap items-center justify-center">
      {genreList}
    </div>
  );
};

export default GenreNav;
