import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import HomeCard from "../component/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";
import logo from "../assest/logo.png";
import "./home.css";
import { AiOutlineSearch } from "react-icons/ai";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable"
  );
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  const filteredProducts = productData.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Update the search term state
  };

  return (
    <div className="home p-2 md:p-4">
      {searchTerm ? (
        <div className="flex flex-wrap gap-8 p-4 justify-center">
          {filteredProducts.map((el) => (
            <HomeCard
              key={el._id}
              id={el._id}
              image={el.image}
              name={el.name}
              farmername={el.farmername}
              price={el.price}
              quantity={el.quantity}
              category={el.category}
            />
            
            
          ))}
          <button
          className="text-black px-4 py-2 rounded-md"
          onClick={handleSearch}
        >
          <AiOutlineSearch /> {/* Search icon */}
        </button>
          
        </div>
      ) : (
        <div>
          <div className="md:flex gap-4 py-2">
            <div className="md:w-3/4 p-5">
              <div className="flex gap-3 bg-white w-36 px-2 items-center rounded-full">
                <p className="text-sm font-bold text-yellow-400">
                  Bike Delivery
                </p>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
                  className="h-7"
                />
              </div>
              <h2 className="text-4xl md:text-7xl font-bold py-5 px-6 text-white">
                The Fasted Delivery From Farmers{" "}
                <span className="text-yellow-500 text-">To Your Home</span>
              </h2>
              <button className="font-bold bg-yellow-500 text-white px-4 py-2 rounded-md">
                Order Now
              </button>
            </div>

            <div className="md:w-3/4 flex flex-wrap gap-8 p-4 justify-center">
              {homeProductCartList[0] ? (
                homeProductCartList.map((el) => (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    farmername={el.farmername}
                    price={el.price}
                    quantity={el.quantity}
                    category={el.category}
                  />
                ))
              ) : (
                loadingArray.map((el, index) => (
                  <HomeCard key={index + "loading"} loading={"Loading..."} />
                ))
              )}
            </div>
          </div>

          <div>
            <div className="flex w-full items-center p-5">
              <h2 className="font-bold text-2xl text-white mb-3 bg-yellow-500 px-5 rounded-full">
                Fresh Vegetables
              </h2>
              <div className="ml-auto flex gap-4">
                <button
                  onClick={preveProduct}
                  className="bg-yellow-300 hover:bg-yellow-400 text-lg  p-2 rounded-md"
                >
                  <GrPrevious />
                </button>
                <button
                  onClick={nextProduct}
                  className="bg-yellow-300 hover:bg-yellow-400 text-lg p-2 rounded-md"
                >
                  <GrNext />
                </button>
              </div>
            </div>
            <div
              className="flex gap-8 overflow-scroll scrollbar-none scroll-smooth transition-all p-5"
              ref={slideProductRef}
            >
              {homeProductCartListVegetables[0] ? (
                homeProductCartListVegetables.map((el) => (
                  <CardFeature
                    key={el._id + "vegetable"}
                    id={el._id}
                    name={el.name}
                    farmername={el.farmername}
                    category={el.category}
                    quantity={el.quantity}
                    price={el.price}
                    image={el.image}
                  />
                ))
              ) : (
                loadingArrayFeature.map((el, index) => (
                  <CardFeature
                    loading="Loading..."
                    key={index + "cartLoading"}
                  />
                ))
              )}
            </div>
          </div>

          <div>
            <AllProduct heading={"Your Product"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
