import React, { useState } from "react";
import loginSignupImage from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsEmojiSmileUpsideDown } from "react-icons/bs";
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";
import "./login.css";


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()  
  const userData = useSelector(state => state)
  const win = window.sessionStorage;

  const dispatch = useDispatch()




  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const handleOnChange = (e)=>{
    const {name,value} = e.target
    setData((preve)=>{
        return{
            ...preve,
            [name] : value
        }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {email,password} = data
    if(email && password ){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const dataRes = await fetchData.json()
      console.log(dataRes)
      
      toast(dataRes.message)
      
      if(dataRes.alert){
        dispatch(loginRedux(dataRes))
        setTimeout(() => {
          navigate("/")
        }, 1000);
      }

      console.log(userData)
      localStorage.setItem('email',email)
    }
    else{
        alert("Please Enter required fields")
    }
  }

  return (
    <>
    <div className="login">
      <div className="login-container">
        <div className="form-container border-4 border-yellow-500">
          {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
          <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
            <img src={loginSignupImage} className="w-full" />
          </div>

          <form className="w-full py-3 flex flex-col text-white px-1" onSubmit={handleSubmit}>
          <label className="font-bold text-white" htmlFor="email">Email</label>
            <div className="flex py-1 px-1 bg-yellow-300  rounded mt-1 mb-2 focus-within:outline-white">
              <input
                type={"email"}
                id="email"
                name="email"
                className="w-full px-3 bg-yellow-500 rounded  border-none outline-white "
                value={data.email}
                onChange={handleOnChange}

              />
            </div>

            <label className="font-bold text-white" htmlFor="password">Password</label>
            <div className="flex px-2 py-1 bg-yellow-300  rounded mt-1 mb-2 focus-within:outline-white">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className=" w-full bg-yellow-500 rounded px-3 border-none outline-white"
                value={data.password}
                onChange={handleOnChange}
              />
              <span
                className="flex text-xl cursor-pointer text-bold text-white"
                onClick={handleShowPassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>

            <button className="w-full max-w-[150px] m-auto  bg-yellow-500 hover:bg-yellow-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
              Login
            </button>
          </form>
          <p className="text-left text-sm mt-2 text-white">
            Don't  have account ?{" "}
            <Link to={"/signup"} className="text-red-500 underline">
             Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login