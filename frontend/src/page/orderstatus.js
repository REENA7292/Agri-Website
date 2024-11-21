import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const OrderDetail = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const userToken = useSelector((state) => state.user.token); // Assuming token is stored in Redux state

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    if (userToken) {
      try {
        const response = await axios.get(`http://localhost:8080/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.status === 200) {
          setOrderDetails(response.data); // Assuming response.data contains order details
        } else {
          console.error("Failed to fetch order details");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    }
  };

  if (!orderDetails) {
    return <div>Loading...</div>; // Or handle the case where orderDetails is not available yet
  }

  return (
    <div>
      <h2>Order Details</h2>
      <div>
        <p>Order ID: {orderDetails.orderId}</p>
        <p>Date: {orderDetails.date}</p>
        {/* Display other order details as needed */}
      </div>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            {/* Add more table headers if needed */}
          </tr>
        </thead>
        <tbody>
          {orderDetails.items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.total}</td>
              {/* Add more table cells if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetail;
