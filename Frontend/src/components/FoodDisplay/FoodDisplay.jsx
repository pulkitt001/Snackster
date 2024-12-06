// import React, { useContext } from 'react'
// import { StoreContext } from '../../context/StoreContext'
// import FoodItem from '../FoodItem/FoodItem'

// import './FoodDisplay.css'
// const FoodDisplay = ({category}) => {
//     const {food_list} =useContext(StoreContext)

//   return (
//     <div className='food-dispay' id="food-Display">
//       <h2>Top Dishes near you</h2>
//       <div className="food-display-list">
//         {food_list.map((item,index)=>{
//           if(category==="All"|| category===item.category)
//           return (<FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>)
//         })}
//       </div>
//     </div>
//   )
// }

// export default FoodDisplay

import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Simulate data fetching (replace with your actual fetch logic)
        if (food_list.length > 0) {
            setLoading(false); // Stop loading when data is available
        }
    }, [food_list]);

    return (
        <div className='food-display' id="food-Display">
            <h2>Top Dishes near you</h2>
            <div className="food-display-list">
                {loading ? (
                    // Display placeholders while fetching data
                    [...Array(6)].map((_, index) => (
                        <div key={index} className="placeholder"></div>
                    ))
                ) : (
                    // Display actual food items once loaded
                    food_list.map((item, index) => {
                        if (category === "All" || category === item.category) {
                            return (
                                <FoodItem
                                    key={index}
                                    id={item._id}
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    image={item.image}
                                />
                            );
                        }
                        return null;
                    })
                )}
            </div>
        </div>
    );
};

export default FoodDisplay;

