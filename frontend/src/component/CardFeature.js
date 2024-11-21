import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlide";
// import backgroundImage from "../assest/cardbg.jpg";
import "./cardfeature.css"; // Import the CSS file

const CardFeature = ({ image, name, price, category, quantity, farmername, loading, id }) => {
  const dispatch = useDispatch();

  const handleAddCartProduct = () => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        quantity: quantity,
        category: category,
        farmername:farmername,
        image: image
      })
    );
  };

  return (
    <div className="card-feature rounded border-4 border-yellow-500">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} className="h-full" alt={name} />
            </div>
            <h3 className="card-feature-title">{name}</h3>
            <p className="card-feature-category">{category}</p>
            <p className="card-feature-category">Farmer({farmername})</p>
            <p className="card-feature-quantity">
              <span>{quantity}</span>
              <span className="text-white">Kg</span>
            </p>
            <p className="card-feature-price">
              <span className="text-white">₹</span>
              <span>{price}</span>
            </p>
          </Link>
          <button
            className="card-feature-button"
            onClick={handleAddCartProduct}
          >
            Add Cart
          </button>
        </>
      ) : (
        <div className="card-feature-loading text-yellow-600 font-bold">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
