import React, { useEffect } from 'react'
import './PlaceOrder.css'
//import {assets} from '../../assets/frontend-assets/assets'
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function PlaceOrder() {
  const { getTotalprice,token,cartItems,url,food_list } = useContext(StoreContext);
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""
  })

  //onchange handelar
  const onChangeHandelar=(e)=>{
    const name=e.target.name;
    const value= e.target.value;
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  //onSubmit handelar
  const onSubmitHandelar= async (e)=>{
    e.preventDefault();
    let orderItem=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItem.push(itemInfo);
      }
    })
   let orderData = {
    address:data,
    items:orderItem,
    amount:getTotalprice()+10,
   }
   try{
    let response = await axios.post(url + "/api/orders/place-order", orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.success) {
      const { seession_url } = response.data;
      window.location.replace(seession_url);
    } else {
      toast.error(response.data.message);
    }
   }catch(err){
    console.log(err);
   }

  }
  const navigate = useNavigate();
  
  useEffect(()=>{
   if(!token){
    navigate("/cart");
   }else if(getTotalprice()===0){
    navigate("/cart")
   }

   
  },[])


  return (
    <form className="place-order" onSubmit={onSubmitHandelar}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input required type="text" placeholder="first name" name='firstName' onChange={onChangeHandelar} value={data.firstName} />
          <input required type="text" placeholder="last name" name='lastName' onChange={onChangeHandelar} value={data.lastName} />
        </div>

        <input required type="email" placeholder="email" name='email' onChange={onChangeHandelar} value={data.email}/>
        <input required type="text" placeholder="street" name='street' onChange={onChangeHandelar} value={data.street}/>

        <div className="multi-fields">
          <input required type="text" placeholder="City" name='city' onChange={onChangeHandelar} value={data.city}/>
          <input required type="text" placeholder="state" name='state' onChange={onChangeHandelar} value={data.state}/>
        </div>

        <div className="multi-fields">
          <input required type="text" placeholder="zipCode" name='zipCode' onChange={onChangeHandelar} value={data.zipCode}/>
          <input required type="text" placeholder="Country" name='country' onChange={onChangeHandelar} value={data.country}/>
        </div>

        <input required type="text" placeholder="phone number" name='phone' onChange={onChangeHandelar} value={data.phone}/>
      </div>

      <div className="place-order-right">
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
            <b>${ getTotalprice===0 ? 0 : getTotalprice()+10}</b>
          </div>
          <button >Proceed to Payment</button>
        
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder