import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend-assets/assets'
import { StoreContext } from '../../Context/StoreContext';
function FoodItem({id,name,description,price,image}) {
   
    const {cartItems,
       
        addToCart,
        removeCartItem,url} = useContext(StoreContext);
  return (
    <div className="foodItem">
      <div className="food-item-img-container">
        <img src={url+"/images/"+image} alt="" className="food-item-img" />
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            alt=""
            className="food-item-add-icon"
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="food-item-count">
            <img
              src={assets.remove_icon_red}
              alt=""
              onClick={() => removeCartItem(id)}
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>
      
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
      </div>

      <p className="food-item-decs">{description}</p>
      <p className="food-item-price">{price} &#36;</p>
    </div>
  );
}

export default FoodItem