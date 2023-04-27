import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const StarRating = ({ totalStars,disable,value,className,sendValue }) => {
  const [selectedStars, setSelectedStars] = useState(value|| 0);

  const handleStarClick = (selectedStars) => {
    setSelectedStars(selectedStars);
    sendValue(selectedStars)
  };
 
  

  return (
    <>
      {[...Array( totalStars)].map((star, index) => {
        const selected = index < selectedStars;
        return (
          <FontAwesomeIcon
           icon={faStar}
           className={className}
           key={index}
            size={24}
            color={selected ? "orange" : "grey"}
            onClick={() => handleStarClick(!disable && index + 1)}
            style={{ cursor: "pointer" }}
           
            />
        
        );
      })}
      
    </>
  );
};

export default StarRating;
