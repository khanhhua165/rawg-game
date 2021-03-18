import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import _ from "lodash";

const ScrollTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = _.throttle(() => {
      if (window.pageYOffset > 1300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed z-50 flex items-center justify-center text-gray-100 duration-700 active:text-gray-700 dark:active:text-gray-50 animate-bounce bg-pink-600 rounded-full dark:text-gray-800 transition-opacity dark:bg-pink-700 w-14 h-14 bottom-3 right-3 sm:bottom-4 sm:right-4 ${
        isVisible ? "cursor-pointer opacity-100" : "opacity-0"
      }`}
      onClick={isVisible ? scrollToTop : () => {}}
    >
      <FaArrowUp className="text-3xl font-bold " />
    </div>
  );
};

export default ScrollTop;
