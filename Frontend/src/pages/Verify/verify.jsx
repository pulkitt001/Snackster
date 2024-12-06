import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import './verify.css'
import axios from 'axios'

const verify = () => {
//To find URL parameters use searchParams
const[searchParams,setSearchParams]=useSearchParams();
const success=searchParams.get("success")
const orderId=searchParams.get("orderId")

const {url}=useContext(StoreContext);

const navigate=useNavigate();

const verifyPayment=async()=>{
  const responce=await axios.post(url +"/api/order/verify",{success,orderId})
  if(responce.data.success){
      navigate('/myorders');
  }
  else{
    navigate("/");
  }
}
useEffect(()=>{
  verifyPayment();
},[])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default verify
