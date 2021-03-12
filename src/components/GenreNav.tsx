import React from "react";
import { NavLink } from "react-router-dom";
import { GenreData } from "../actions/GenreActions";

const GenreNav: React.FC<{ genres: GenreData[] }> = ({ genres }) => {
  const genreList = genres.map((genre) => {
    return (
      <NavLink
        className="p-2 mt-5 mr-4 text-gray-900 transition duration-200 bg-gray-300 rounded-2xl hover:bg-pink-600 dark:bg-gray-700 hover:text-gray-50 dark:hover:bg-pink-600 dark:text-white"
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
        {genre.name}
      </NavLink>
    );
  });

  return <div className="flex flex-wrap items-center">{genreList}</div>;
};

export default GenreNav;
