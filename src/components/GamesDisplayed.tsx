import React from "react";
import Spinner from "../svgs/Spinner";
import { GameType } from "../types/GameType";

const GamesDisplayed: React.FC<{ games: GameType[] }> = ({ games }) => {
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center w-full mt-28">
        <Spinner classItems="w-24 mx-auto animate-spin dark:text-gray-300" />
        <div className="text-xl italic font-semibold dark:text-gray-300">
          Loading...
        </div>
      </div>
    );
  }
  const result = games.map((game) => (
    <div key={game.slug} className="text-4xl text-white">
      {game.name}
    </div>
  ));
  return <div className="flex flex-col">{result}</div>;
};

export default GamesDisplayed;
