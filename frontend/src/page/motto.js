import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import FilterFarmer from "../component/FilterFarmer"; // Import the FilterFarmer component

const FarmerProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const farmerList = [...new Set(productData.map((el) => el.farmername))];

  const [filterByFarmer, setFilterByFarmer] = useState("");
  const [dataFilteredByFarmer, setDataFilteredByFarmer] = useState([]);

  useEffect(() => {
    setDataFilteredByFarmer(productData);
  }, [productData]);

  const handleFilterByFarmer = (farmername) => {
    setFilterByFarmer(farmername);
    const filteredData = productData.filter(
      (el) => el.farmername.toLowerCase() === farmername.toLowerCase()
    );
    setDataFilteredByFarmer(() => {
      return [...filteredData];
    });
  };
  
  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="my-5">
      <div className="flex gap-9 justify-center overflow-scroll scrollbar-none">
        {farmerList[0] ? (
          farmerList.map((el) => {
            return (
              <FilterFarmer // Replace FilterProduct with FilterFarmer
                farmername={el}
                key={el}
                isActive={el.toLowerCase() === filterByFarmer.toLowerCase()}
                onClick={() => handleFilterByFarmer(el)}
              />
            );
          })
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p className="font-bold text-yellow-600">Loading...</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-9 my-6">
        {dataFilteredByFarmer[0]
          ? dataFilteredByFarmer.map((el) => {
              return (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  farmername={el.farmername}
                  quantity={el.quantity}
                  price={el.price}
                />
              );
            })
          : 
          loadingArrayFeature.map((el,index) => (
              <CardFeature loading="Loading..." key={index+"farmername"} />
            ))}
      </div>
    </div>
  );
};

export default FarmerProduct;
