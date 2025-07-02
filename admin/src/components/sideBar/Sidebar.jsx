import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink className="sidebar-option" to={"/add"}>
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>

        <NavLink className="sidebar-option" to={"/list"}>
          <img src={assets.order_icon} alt="" />
          <p>List of Items</p>
        </NavLink>

        <NavLink className="sidebar-option" to={"/orders"}>
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar