import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="flex mb-2 dark:text-gray-50">
      <p>
        Made by{" "}
        <a
          href="https://github.com/khanhhua165"
          target="_blank"
          rel="noreferrer"
        >
          Khanh Hua
        </a>{" "}
        - Powered by{" "}
        <a href="https://rawg.io/apidocs" target="_blank" rel="noreferrer">
          RAWG
        </a>
      </p>
    </div>
  );
};

export default Footer;
