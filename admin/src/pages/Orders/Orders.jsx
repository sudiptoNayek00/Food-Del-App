import React from "react";
import "./Orders.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import Loading from "../../components/Loading/Loading";

function Orders({ url }) {
  const [orders, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      let response = await axios.get(url + "/api/orders/list");
      if (response.data.success) {
        setOrder(response.data.data);
        console.log(response.data.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch orders");
    }
    setLoading(false);
  };
  const statusHandler = async (id, event) => {
    try {
      
      const response = await axios.put(url +"/api/orders/status/", {
        id,
        status: event.target.value,
      });
      if (response.data.success) {
        fetchAllOrders();
        toast.success("Order status updated!");
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Server error: Could not update status");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="orders add">
      <h2>Orders</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="order-list">
          {orders.map((order, index) => {
            return (
              <div className="order-item" key={index}>
                <img src={assets.parcel_icon} alt="" />
                <div>
                  <p className="order-item-food">
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })}
                  </p>
                  <p className="order-item-name">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <div className="order-item-address">
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city} ,{order.address.state},
                      {order.address.zipCode},{order.address.country}
                    </p>
                  </div>
                  <p className="order-item-phone">{order.address.phone}</p>
                  <p>${order.amount}</p>
                  <select
                    onChange={(event) => statusHandler(order._id, event)}
                    value={order.status}
                  >
                    <option value="Pending">Pending</option>
                    {console.log(order.status)}
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;
