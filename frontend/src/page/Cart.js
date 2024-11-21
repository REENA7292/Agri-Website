// import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assest/empty3.jpg";
import { toast } from "react-hot-toast";
// import { deleteCartItem } from "../redux/productSlide";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import logo from "../assest/logo.png";

const Cart = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);

  const isLoggedIn = !!user && !!user.email;

  const totalPrice = productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0);
  const totalQty = productCartItem.reduce((acc, curr) => acc + curr.qty, 0);

  // const [loading, setLoading] = useState(false);

  // const sendDataToBackend = async () => {
  //   try {
  //     setLoading(true);
      
  //     const cartData = productCartItem
  //     .filter((item) => item.qty !== 0)
  //     .map((item) => ({
  //       name: item.name,
  //       price: item.price,
  //       quantity: item.qty,
  //       total: item.total,
  //       razorpay_payment_id: item.razorpay_payment_id,
  //     }));

  //     if (cartData.length === 0) {
  //       // If there are no items with a quantity greater than 0, return or perform an action
  //       console.log('No items with quantity greater than 0 to send to backend');
  //       return;
  //     }

  //     const response = await fetch('https://agri-website-4.onrender.com/store-cart-details', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ cartItems: cartData }),
  //     });
      

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log('Cart details sent successfully:', responseData);
  //       toast.success('Cart details sent successfully');
  //       // Reset cart after successful submission (you might want to dispatch an action to clear the cart)
        
  //     } else {
  //       throw new Error('Failed');
  //     }
  //   } catch (error) {
  //     console.error('Error sending cart details:', error);
  //     toast.error('Failed to send cart details');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const openRazorpay = () => {
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }

    // sendDataToBackend();

    const options = {
      key: "rzp_test_BE6renshHuqsYS",
      amount: totalPrice * 100,
      currency: "INR",
      name: "AGRIDUCT",
      description: "Payment for items",
      image: logo,
      handler: function (response) {
        toast.success("Payment successful! Order ID: " + response.razorpay_payment_id);
        navigate('/');
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#3399cc"
      }
    };
    const razorpay = new window.Razorpay(options);
    
    razorpay.open();
  };

  return (
    <div className="i">
      <div className="car1 p-5 md:p-4">
        <h2 className="text-lg md:text-6xl font-bold text-yellow-500">
          Your
          <span className="text-white"> Cart Items</span>
        </h2>

        {productCartItem[0] ?
          <div className="my-5 flex gap">
            <div className="md:w-3/4  flex-col  p-4 justify-center ">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    farmername={el.far}
                    quantity={el.quantity}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}

                  />
                );
              })}
            </div>
            <div className="cart2 w-full max-w-md p-7 ml-auto mx-10 h-fullnpm border-8 border-yellow-300">
              <h2 className="bg-yellow-500 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg text-white font-bold border-b">
                <p>Total Qty :</p>
                <p className="ml-auto w-32 font-bold">
                  <span>{totalQty}</span>
                  <span className="font-bold text-yellow-500">Kg</span>
                </p>
              </div>
              <div className="flex w-full py-2 text-lg text-white font-bold border-b">
                <p>Total Price :</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-yellow-500">₹</span> {totalPrice}
                </p>
              </div>
              <button className="bg-yellow-500 w-full text-lg font-bold py-2 text-white" onClick={openRazorpay}>
                {isLoggedIn ? 'Pay' : 'Login to Pay'}
              </button>
            </div>
          </div>
          :
          <div className="flex w-full justify-center items-center flex-col">
            <img src={emptyCartImage} className="w-full max-w-sm" alt="Empty Cart" />
            <p className="text-yellow-500 text-3xl font-bold">Empty Cart</p>
          </div>
        }
      </div>
    </div>
  );
};

export default Cart;
