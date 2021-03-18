import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

const TrailerModal: React.FC<{
  source: string;
  switchShowTrailer: () => void;
}> = ({ source, switchShowTrailer }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 dark:bg-gray-700">
      <div
        className="self-end mb-4 mr-2 text-6xl text-white cursor-pointer sm:mr-11 hover:text-pink-500"
        onClick={switchShowTrailer}
      >
        <IoIosCloseCircle />
      </div>
      <video
        src={source}
        controls
        autoPlay
        className="w-full sm:rounded-md sm:w-3/4"
      />
    </div>
  );
};

export default TrailerModal;
