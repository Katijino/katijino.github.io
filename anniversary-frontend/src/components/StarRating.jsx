import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({ onRatingSelect }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    if (onRatingSelect) onRatingSelect(ratingValue); // send rating to parent
  };

  return (
    <div>
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
              style={{ display: "none" }}
            />
            <FaStar
              className="star"
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={30}
              style={{ cursor: "pointer" }}
            />
          </label>
        );
      })}
    </div>
  );
}
