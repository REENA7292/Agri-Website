import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";
import "./signup.css";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image : ""
  });

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProfileImage = async(e)=>{
      const data = await ImagetoBase64(e.target.files[0])
  

      setData((preve)=>{
          return{
            ...preve,
            image : data
          }
      })

  }
console.log(process.env.REACT_APP_SERVER_DOMIN)
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        // console.log(process.env.REACT_APP_SERVER_DOMIN);
    
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,{
          method :"POST",
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
           

          const dataRes = await fetchData.json()
    

        // alert(dataRes.message);
        toast(dataRes.message)
        if(dataRes.alert){
          navigate("/login");
        }
       
      } else {
        alert("password and confirm password not equal");
      }
    } else {
      alert("Please Enter required fields");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form border-4 border-yellow-500">
        {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          <img src={data.image ? data.image :  loginSignupImage} className="w-full h-full" />

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3  bg-yellow-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 font-bold text-white">Upload</p>
            </div>
            <input type={"file"} id="profileImage" accept="image/*" className="hidden outline-white" onChange={handleUploadProfileImage}/>
          </label>
        </div>

        <form className="w-full  flex flex-col text-white " onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <div className="flex py-0 px-1 bg-yellow-300  rounded mt-1 mb-1 focus-within:outline-white">
            <input
              type={"text"}
              id="firstName"
              name="firstName"
              className="mt-1 mb-1 w-full bg-yellow-500 px-2 py-1 rounded outline-white"
              value={data.firstName}
              onChange={handleOnChange}
            />
          </div>

          <label htmlFor="lastName">Last Name</label>
          <div className="flex py-0 px-1 bg-yellow-300  rounded mt-1 mb-1 focus-within:outline-white">
            <input
              type={"text"}
              id="lastName"
              name="lastName"
              className="mt-1 mb-1 w-full bg-yellow-500 px-2 py-1 rounde outline-white"
              value={data.lastName}
              onChange={handleOnChange}
            />
          </div>

          <label htmlFor="email">Email</label>
          <div className="flex py-0 px-1 bg-yellow-300  rounded mt-1 mb-1 focus-within: outline-white">
            <input
              type={"email"}
              id="email"
              name="email"
              className="mt-1 mb-1 w-full bg-yellow-500 px-2 py-1 rounded outline-white"
              value={data.email}
              onChange={handleOnChange}
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-yellow-300  rounded mt-1 mb-2 focus-within:outline focus-within: outline-none">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-yellow-500 border-none rounded outline-white"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label className="text-white" htmlFor="confirmpassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-yellow-300  rounded mt-1 mb-2  focus-within:outline focus-within:outline-none">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              className=" w-full bg-yellow-500 border-none rounded outline-white "
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto  bg-yellow-500 hover:bg-yellow-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Sign up
          </button>
        </form>
        <p className="text-left text-sm mt-2 text-white">
          Already have account ?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
