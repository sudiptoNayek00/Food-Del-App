import React, { useContext } from 'react'
import './CartPage.css'
import { StoreContext } from '../../Context/StoreContext';
// import {assets} from '../../assets/frontend-assets/assets'
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { food_list, cartItems,removeCartItem,getTotalprice,url } = useContext(StoreContext);
  const navigate = useNavigate()
  return (
    <div className="cart">
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div key={index} className="cart-item-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => removeCartItem(item._id)}
                    className="remove"
                  >
                    {" "}
                    <DeleteIcon />{" "}
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2> Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalprice()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Charge</p>
            <p>${getTotalprice()===0?0:10}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalprice===0 ? 0 : getTotalprice()+10}</b>
          </div>
          <button onClick={()=>navigate('/order')}>Place Order</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promocode please enter it here </p>
            <div className="cart-promocode-Input">
              <input type="text" placeholder="Promocode" />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage