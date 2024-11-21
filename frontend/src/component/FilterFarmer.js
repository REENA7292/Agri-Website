import React from "react";
import { VscAccount } from "react-icons/vsc";

const FilterFarmer = ({farmername,onClick,isActive}) => {
  return (
    <div onClick={onClick}>
      <div className={`text-3xl text-white p-5  rounded-full border-4 border-yellow-400 hover:bg-white cursor-pointer ${isActive ? "bg-white" : "bg-yellow-900"}`}>
        <VscAccount />
      </div>
      <p className="text-center text-white font-medium my-1 capitalize">{farmername}</p>
    </div>
  );
};

export default FilterFarmer;