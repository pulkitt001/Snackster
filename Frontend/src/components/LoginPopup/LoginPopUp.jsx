import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import './LoginPopUp.css'
import axios from "axios"

const LoginPopUp = ({setShowLogin}) => {

  const {url,setToken}=useContext(StoreContext)


  const [curState,setCurState]=useState("Login")

//connecting frontend to backend
const [data,setData]=useState({
  name:"",
  email:"",
  password:""
})

  const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))
  }

//for varification of onChangeHandler function working
// useEffect(()=>{
//   console.log(data);
// },[data])


//On Login
const onLogin=async(event)=>{
      event.preventDefault(); //for prevent the reload the page after submiting
       //so we create an instance of this (above) url
       let newUrl=url;
       if(curState==="Login")
       {
        newUrl+="/api/user/login"
       }
       else{
        newUrl+="/api/user/register"
       }
      const responce=await axios.post(newUrl,data);

      if(responce.data.success)
      {
          setToken(responce.data.token);
          localStorage.setItem("token",responce.data.token);
          setShowLogin(false);
      }
      else{
        alert(responce.data.message);
      }
}




  return (
    <div className='login-popup'>
      <form  onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{curState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {curState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
           <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <div>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        </div>
        <button type='submit'>{curState==="Sign Up"?"Create Account":"Login"}</button>
       
        {curState=="Login"
        ?<p>Create a new Account? <span onClick={()=> setCurState("Sign Up")}>Click here</span></p>
        :<p>Already have an account? <span onClick={()=> setCurState("Login")}>Login here</span></p>}
        
        
      </form>
    </div>
  )
}

export default LoginPopUp
