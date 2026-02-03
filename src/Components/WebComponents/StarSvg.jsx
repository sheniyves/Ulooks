import * as React from "react";
import { useState } from "react";

const StarSvg = ({ filled, onClick, index }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick(index);
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <svg
      viewBox="0 0 51 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "3.125rem",
        transform: isClicked ? "scale(1.2)" : "scale(1)",
        transition: "transform 0.2s ease, fill 0.2s ease",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <path
        d="M18.3831 8.52C21.5506 2.84 23.1331 0 25.5006 0C27.8681 0 29.4506 2.84 32.6181 8.52L33.4381 9.99C34.3381 11.605 34.7881 12.4125 35.4881 12.945C36.1881 13.4775 37.0631 13.675 38.8131 14.07L40.4031 14.43C46.5531 15.8225 49.6256 16.5175 50.3581 18.87C51.0881 21.22 48.9931 23.6725 44.8006 28.575L43.7156 29.8425C42.5256 31.235 41.9281 31.9325 41.6606 32.7925C41.3931 33.655 41.4831 34.585 41.6631 36.4425L41.8281 38.135C42.4606 44.6775 42.7781 47.9475 40.8631 49.4C38.9481 50.8525 36.0681 49.5275 30.3131 46.8775L28.8206 46.1925C27.1856 45.4375 26.3681 45.0625 25.5006 45.0625C24.6331 45.0625 23.8156 45.4375 22.1806 46.1925L20.6906 46.8775C14.9331 49.5275 12.0531 50.8525 10.1406 49.4025C8.22309 47.9475 8.54059 44.6775 9.17309 38.135L9.33809 36.445C9.51809 34.585 9.60809 33.655 9.33809 32.795C9.07309 31.9325 8.47559 31.235 7.28559 29.845L6.20059 28.575C2.00809 23.675 -0.0869125 21.2225 0.643087 18.87C1.37309 16.5175 4.45059 15.82 10.6006 14.43L12.1906 14.07C13.9381 13.675 14.8106 13.4775 15.5131 12.945C16.2156 12.4125 16.6631 11.605 17.5631 9.99L18.3831 8.52Z"
        fill={filled ? "#F79009" : "#D3D3D3"}
      />
    </svg>
  );
};

const StarRating = ({rating, setRating}) => {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;
        return (
          <div
            key={index}
            onMouseEnter={() => setHover(starIndex)}
            onMouseLeave={() => setHover(0)}
          >
            <StarSvg
              filled={starIndex <= (hover || rating)}
              onClick={(i) => setRating(i)}
              index={starIndex}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
