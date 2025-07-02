import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext';
import './Myorder.css'
import axios from 'axios';
import {assets} from '../../assets/frontend-assets/assets'

function Myorder() {
    const [data,setData]=useState([]);

    const {url,token}= useContext(StoreContext);

    const fetchData= async ()=>{
        const response = await axios.post(
          `${url}/api/orders/user-orders`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setData(response.data.data);
        console.log(response.data);
        
    }

    useEffect(() => {
        if(token){
            fetchData();
        }
    }, [token])
  return (
    <div className='myorder'>
        <h2>My Orders</h2>
        <div className="container">
            {
                data.map((order,index)=>{
                    return(
                        <div className='myorder-order' key={index}>
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item,index)=>{
                               if(index === order.items.length-1){
                                return(
                                    item.name + " x " + item.quantity
                                )
                               }else{
                                return(
                                    item.name + " x " + item.quantity + ", "
                                )
                               }
                               
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Item: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${order.address.street}`)}>Track Order</button>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Myorder