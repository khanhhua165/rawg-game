import React from "react";
import { GameType } from "../types/GameType";

const GamesDisplayed: React.FC<{ games: GameType[] }> = (props) => {
  const result = props.games.map((game) => (
    <div key={game.slug} className="text-4xl text-white">
      {game.name}
    </div>
  ));
  return <div className="flex flex-col">{result}</div>;
};

export default GamesDisplayed;
