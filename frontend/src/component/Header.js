import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assest/logo.png";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {logoutRedux} from "../redux/userSlice";
import { clearCartItem ,filterProducts} from "../redux/productSlide";
import { toast } from "react-hot-toast";
import "./FilterProduct"

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const userData = useSelector((state) => state.user);
  const cartItemNumber = useSelector((state) => state.product.cartItem)
  console.log(userData.email)

  const dispatch = useDispatch();

  const handleLogout = () => {
    if (userData && userData.email) {
      // Dispatch action to clear cart items upon logout
      if (cartItemNumber && cartItemNumber.length > 0) {
        cartItemNumber.forEach((item) => {
          dispatch(clearCartItem(item.id)); // Assuming clearCartItems action takes an 'id' parameter
        });
      }
  
      dispatch(logoutRedux());
      toast("Logout successfully");
  
      // Perform any additional logout actions (e.g., clearing user session, redirecting to the login page, etc.)
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update the search term state
  };

  const performSearch = () => {
    // Add logic to perform search based on 'searchTerm'
    // You can use 'searchTerm' to filter products or perform search operations
    // For example: Dispatch an action to filter/search products based on 'searchTerm'
    console.log("Perform search:", searchTerm);
    dispatch(filterProducts(searchTerm));
  };

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  // const handleLogout = () => {
  //   dispatch(logoutRedux());
  //   toast("Logout successfully");
  // };



  console.log(process.env.REACT_APP_ADMIN_EMAIL)
  return (
    <header className="fixed shadow-md w-full h-15  px-2 md:px-4 z-50 bg-white" >
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-16 w-25">
            <img src={logo} className="h-full rounded-full" />
          </div>
        </Link>
        {/* <div className="p-2 rounded-full bg-yellow-400 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-40 px-2 py-1 rounded-full outline-none bg-transparent border-none text-black placeholder-black"
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              // Add other desired styles
            }}
          />
          <button
            className="absolute right-2 top-100 focus:outline"
            onClick={performSearch}
          >
            <i className="fa fa-search text-black"></i>
          </button>
        </div> */}

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg text-white hidden md:flex">
            <Link to={""} className="bg-yellow-400 p-2 rounded">Home</Link>
            <Link to={"menu/6574b1ff80592509a7eb17f4"}className="bg-yellow-400 p-2 rounded">Menu</Link>
            <Link to={"about"}className="bg-yellow-400 p-2 rounded">About</Link>
            <Link to={"motto"}className="bg-yellow-400 p-2 rounded">Filter By Farmer</Link>
            {/* <Link to={"orderstatus"}className="bg-yellow-400 p-2 rounded">YourOrders</Link> */}
            <Link to={"contact"}className="bg-yellow-400 p-2 rounded">Contact</Link>
          </nav>
          
          <div className="text-3xl text-white md:flex items-center p-2 h-11 w-15 rounded relative bg-yellow-400">
            <Link to={"cart"}>
              <BsCartFill />
              <div className="absolute -top-1 -right-1 item-center text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center ">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className=" text-white p-2 rounded-full bg-yellow-400" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflowY-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="h-auto w-auto rounded-full" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL &&  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2 text-white bg-yellow-500 hover:bg-yellow-200"
                  >
                    New product
                  </Link>
                }

                {
                  // userData.image ? <p className="cursor-pointer text-black px-2 hover:bg-yellow-400" onClick={handleLogout}>Logout({userData.firstName})</p> : <link to={"login"} className="whitespace"></link>
                }


                {userData.email? (
                  <p
                    className="cursor-pointer text-white px-2 bg-yellow-500 hover:bg-yellow-200"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName}){" "}
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer bg-yellow-500 hover:bg-yellow-200 px-2  text-white"
                  >
                    Login
                  </Link>
                )}
                <nav className="text-base md:text-lg flex bg-yellow-500 flex-col hover:bg-yellow-200 md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={"menu/6574b1ff80592509a7eb17f4"}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link>
                  <Link to={"about"} className="px-2 py-1">
                    About
                  </Link>
                  <Link to={"motto"} className="px-2 py-1">
                    Filter By Farmer
                  </Link>
                  <Link to={"orderstatus"} className="px-2 py-1">
                     Order details
                  </Link>
                  <Link to={"contact"} className="px-2 py-1">
                    Contact
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;
