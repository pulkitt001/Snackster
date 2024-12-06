import React from 'react'
import "./Orders.css"
import {toast} from "react-toastify"
import { useState, useEffect} from 'react'
import axios from "axios"
import {assets} from "../../assets/assets"

const Orders = ({url}) => {

  const [orders, setOrders] = useState([]);


  const fetchAllOrders=async()=>{
      const responce=await axios.get(url +"/api/order/list");
      if(responce.data.success)
      {
        setOrders(responce.data.data);
        console.log(responce.data.data);
      }
      else{
          toast.error("Error");
      }
  }

// for udating Status Handling which come from backend database  
const statusHandler=async (event,orderId)=>{
  const responce=await axios.post(url + "/api/order/status",{
    orderId,
    status:event.target.value
  });
  if(responce.data.success)
  {
    await fetchAllOrders();
  }
}






useEffect(()=>{
  fetchAllOrders();
},[])


  return (
    <div className='order-add'>
      <h3>Order Page</h3>
      <div className="order-list">
        { orders.map((order,index)=>(
          <div key={index}  className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item,index)=>{
                      if(index === order.items.length-1)
                      {
                          return item.name +" X " +item.quantity
                      }
                      else{
                        return item.name+ " X " + item.quantity + " , "
                      }
          })}
                </p>
                <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                <div className="order-item-address">
                  <p>{order.address.street+ ","}</p>
                  <p>{order.address.city + "," + order.address.state + "," + order.address.country + ", " + order.address.zipCode}</p>
                  
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items:{order.items.length}</p>
              <p>₹ {order.amount}</p>

              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} >
                <option value="Food Processing...">Food Processing...</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
