import React from "react";
import { Link } from "react-router-dom";
import "./HomeCard.css";// Import the CSS file

const HomeCard = ({ name, image, category, price, quantity,farmername, loading, id }) => {
  return (
    <div className="home-card rounded-md gap-8 my-2 border-4 border-yellow-500">
      {name ? (
        <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
          <div className="w-40 min-h-[150px]">
            <img src={image} alt={name} />
          </div>
          <h3>{name}</h3>
          <p>{category}</p>
          <p>Farmer({farmername})</p>
          <p>
            <span>{quantity}</span>
            <span className="font-bold text-white">Kg</span>
          </p>
          <p className="price">
            <span className="text-white">₹</span>
            <span>{price}</span>
          </p>
        </Link>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-bold text-yellow-500">{loading}</p>
        </div>
      )}
    </div>
  );
};

export default HomeCard;
