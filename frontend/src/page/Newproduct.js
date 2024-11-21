import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import {BsCloudUpload} from "react-icons/bs"
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import '../page/newproduct.css'

const Newproduct = () => {
  const [data,setData] = useState({
    name : "",
    category : "",
    image : "",
    quantity : "",
    farmername:"",
    price : "",
    description : ""
  })

  const handleOnChange = (e)=>{
    const {name,value} = e.target

    setData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
    })

  }

  const uploadImage = async(e)=>{
      const data = await ImagetoBase64(e.target.files[0])
      // console.log(data)

      setData((preve)=>{
        return{
          ...preve,
          image : data
        }
      })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(data)

    const {name,image,category,price,farmername,quantity} = data

    if(name && image && category && price &&quantity &&farmername){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const fetchRes =  await fetchData.json()
  
      console.log(fetchRes)
      toast(fetchRes.message)

      setData(()=>{
        return{
          name : "",
          category : "",
          image : "",
          price : "",
          quantity : "",
          farmername :"",
          description : ""
        }
      })
    }
    else{
      toast("Enter required Fields")
    }
    
   
  }
  return (
    <div className="newp p-6 mx-6 text-white font-bold ">
       <form className=" newp2 m-auto  max-w-md  shadow flex flex-col p-4 rounded-md border-4 border-yellow-500" onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <div className="py-1 px-1 bg-yellow-300  rounded mt-1 mb-2 focus-within:outline-white"> 
          <input type={"text"}  name="name" className='bg-yellow-500  rounded p-1 my-1 mx-300 w-full outline-white' onChange={handleOnChange} value={data.name} />
        </div>
        <label htmlFor='category'>Category</label>
        <div className=" py-1 px-1 bg-yellow-300  rounded mt-1 mb-2 focus-within:outline-white">
          
          <select className='bg-yellow-500 w-full items-center rounded p-1 my-1 ' id='category' name='category' onChange={handleOnChange} value={data.category}>
            <option value={"other"}>select category</option>
            <option value={"fruits"}>Fruits</option>
            <option value={"vegetable"}>Vegetable</option>
            <option value={"rice"}>rice</option>
            <option value={"grains"}>Grains</option>
          </select>

        </div>
        <label htmlFor='image'>Image
        <div  className='h-40 w-full bg-yellow-300  rounded flex items-center justify-center cursor-pointer'>
          {/* <div className='bg-yellow-500 flex items-center justify-center cursor-pointer p-10 px-10'> */}
            {
              data.image ? <img src={data.image} className="h-full" /> :<span className='text-5xl'><BsCloudUpload/></span> 
            }
          

          
            <input type={"file"} accept="image/*" id="image" onChange={uploadImage} className="hidden"/>
          {/* </div> */}
            
            
           
        </div>
        </label>
        

        <label htmlFor='price' className='my-1'>Price</label>
        <div className='bg-yellow-300 rounded p-1'>
          <input type={"text"} className='bg-yellow-500 w-full px-2 p-1 rounded my-1' name='price' onChange={handleOnChange} value={data.price}/>
        </div>

        <label htmlFor='quantity' className='my-1'>Quantity( in kg )</label>
        <div className='bg-yellow-300 rounded p-1'>
          <input type={"text"} className='bg-yellow-500 rounded w-full p-1 my-1' name='quantity' onChange={handleOnChange} value={data.quantity}/>
        </div>

        <label htmlFor='quantity' className='my-1'>Farmer Name</label>
        <div className='bg-yellow-300 rounded p-1'>
          <input type={"text"} className='bg-yellow-500 rounded w-full p-1 my-1' id='farmername' name='farmername' onChange={handleOnChange} value={data.farmername}/>
        </div>

        <label htmlFor='description'>Description</label>
        <div className='bg-yellow-300 rounded p-1'>
          <textarea rows={2} value={data.description} className='bg-yellow-500 w-full rounded p-1 my-1 resize-none' name='description' onChange={handleOnChange}></textarea>
        </div>
        <button className='w-full max-w-[150px] m-auto  bg-yellow-500 hover:bg-yellow-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4'>Save</button>
       </form>
    </div>
  )
}

export default Newproduct