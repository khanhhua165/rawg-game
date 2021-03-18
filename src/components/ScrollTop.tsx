import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 1300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible ? (
        <div className="fixed z-50 flex items-center justify-center transition bg-pink-600 rounded-full cursor-pointer dark:bg-pink-700 w-14 h-14 bottom-3 right-3 sm:bottom-4 sm:right-4">
          <FaArrowUp
            className="text-3xl font-bold text-gray-100 dark:text-gray-800"
            onClick={scrollToTop}
          />
        </div>
      ) : null}
    </>
  );
};

export default ScrollTop;
