import React from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteCartItem,increaseQty,decreaseQty} from "../redux/productSlide";
import "./cartproduct.css"

const CartProduct = ({ id, name, image, category, quantity, qty, total, price }) => {
  const dispatch = useDispatch();

  // const handleIncrease = () => {
  //   dispatch(increaseQty(id));
  // };

  // const handleDecrease = () => {
  //   dispatch(decreaseQty(id));
  // };

  // const handleDelete = () => {
  //   dispatch(deleteCartItem(id));
  // };

  return (
    <div className="cartp p-3 my-16 mx-3 md:w-3/4 flex flex-warp  gap-8 rounded border  border-yellow-300">
      <div className="p-3 bg-white rounded overflow-hidden">
        <img src={image} className="h-70 w-40 object-cover "/>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-yellow-500 font-bold  capitalize text-lg md:text-xl">
            {name}
          </h3>
          <div className="cursor-pointer text-yellow-500 hover:text-yellow-300" onClick={()=>dispatch(deleteCartItem(id))}>
            <AiFillDelete />
          </div>
        </div>
        <p className=" text-white  font-medium ">{category}</p>
        <p className="font-bold text-white bg-yellow-500 w-16 h-27">
            <span className="ml-2 text-white">{qty}</span>
            <span className="text-white font-bold">Kg</span>
          </p>
        <p className=" font-bold text-base ">
          <span className="text-yellow-500 fornt-bold">{quantity}</span>
          <span className="font-bold text-white">Kg</span>
          <span className="text-yellow-500"> = </span>

          <span className="text-yellow-500 ">₹</span>
          <span className="text-white">{price}</span>
          
        </p>
        <div className="flex justify-between ">
          <div className="flex gap-3 items-center">
            <button onClick={()=>dispatch(increaseQty(id))} className="bg-yellow-300 py-1 mt-2 rounded hover:bg-yellow-400 p-1 ">
              <TbPlus />
            </button>
            <p className="font-semibold px-4 text-white font-bold bg-yellow-500">{qty}</p>
            <button
              onClick={()=>dispatch(decreaseQty(id))}
              className="bg-yellow-300 py-1  mt-2 rounded hover:bg-yellow-400 p-1 "
            >
              <TbMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-white">
            <p>Total :</p>
            <p><span className="text-yellow-500">₹</span>{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
