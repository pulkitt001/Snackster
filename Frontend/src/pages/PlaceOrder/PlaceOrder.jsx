import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, setCartItems, url } = useContext(StoreContext); // Access setCartItems

  // State for storing user delivery information
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  // State to store selected payment method
  const [paymentMethod, setPaymentMethod] = useState("card");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onPaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const navigate = useNavigate();

  // Function to handle placing an order
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    // Prepare order items
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let item_info = { ...item };
        item_info["quantity"] = cartItems[item._id];
        orderItems.push(item_info);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20, // Total amount including delivery fee
      paymentMethod: paymentMethod
    };

    try {
      if (paymentMethod === "card") {
        // Handle card payment - redirect to payment gateway
        let response = await axios.post(`${url}/api/order/place` , orderData, { headers: { token } });
        if (response.data.success) {
          const { session_url } = response.data;
          window.location.replace(session_url); // Redirect to payment gateway
        } else {
          alert("Error placing order.");
        }
      } else {
        let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
        if (response.data.success) {
          navigate('/myorders');
          alert("Order placed successfully with Cash on Delivery!");
          setCartItems({}); // Clear cart after successful order
        } else {
          alert("Error placing order.");
        }
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Failed to place the order.");
    }
  };

  // Ensure user is logged in and has items in the cart
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, navigate, getTotalCartAmount]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹ {getTotalCartAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
            </div>
          </div>

          {/* Payment Options */}
          <div className="payment-method">
            <p className="title">Payment Method</p>
            <div>
              <input type="radio" id="card" name="paymentMethod" value="card" checked={paymentMethod === "card"} onChange={onPaymentChange} />
              <label htmlFor="card">Pay with Card</label>
            </div>
            <div>
              <input type="radio" id="cod" name="paymentMethod" value="cod" checked={paymentMethod === "cod"} onChange={onPaymentChange} />
              <label htmlFor="cod">Cash on Delivery</label>
            </div>
          </div>

          {/* Proceed to Payment Button */}
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};


export default PlaceOrder;

