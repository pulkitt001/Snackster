import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
// import { food_list } from "../assets/assets";

export const StoreContext=createContext(null) 
// this is Context API

const StoreContextProvider =(props)=>{

    const [cartItems,setCartItems]=useState({});

// while connecting with backend
    const url="http://localhost:4000";
    const [token,setToken]=useState("")

    // showing only those data which is stored in the database
        const [food_list,setFoodList]=useState([]);


    const addToCart =async (itemId)=>{
        if(!cartItems[itemId])
        {
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }
        else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    }
    const removeFromCart =async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url +"/api/cart/remove",{itemId},{headers:{token}});
        }
    }
    /*// useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])*/

     const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0){
            let itemInfo=food_list.find((product)=>product._id===item);
            totalAmount+=itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }

    // fetching food list from the database 

    const fetchFoodList =async ()=>{
        const responce =await axios.get(url+"/api/food/list");
        setFoodList(responce.data.data);
    }


// for resolving the error that is if we refresh the page the "+" sign increases data get off 

    const loadCartData=async (token)=>{
    const responce=await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(responce.data.cartData);
}

     // After refreshing we logout from the page so for stopping this I'm writing this function
    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();

            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
            
    },[])

     const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
