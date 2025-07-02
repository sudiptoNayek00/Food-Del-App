import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import {assets} from '../../assets/frontend-assets/assets'
import { StoreContext } from '../../Context/StoreContext';

function Navbar({setLogin}) {
    const [menu , setMenu] = useState("home");
    const {getTotalprice,token,setToken}= useContext(StoreContext);
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("token");
      setToken(null);
      navigate("/");
      window.location.replace('/');
    }
   

  return (
    <div className="navbar-container">
     <Link to={'/'}> <img src={assets.logo} alt="logo" className="logo" /> </Link>
      <ul className="navbar-menu">
        <Link
          to={"/"}
          onClick={() => setMenu("home")}
          className={menu == "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#exploreMenu"
          onClick={() => setMenu("menu")}
          className={menu == "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#appDownlode"
          onClick={() => setMenu("mobileapp")}
          className={menu == "mobileapp" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contactus")}
          className={menu == "contactus" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        <img
          src={assets.search_icon}
          alt="search_icon"
          className="search-icon"
        />
        <div className="navbar-search-icon">
          <Link to={"/cart"}>
            <img src={assets.basket_icon} alt="basket_icon" />
          </Link>
          <div className={getTotalprice()===0?"":"dot"}></div>
        </div>
        {
          !token ? (<button className="sign_in_btn" onClick={() => setLogin(true)}>
          Sign in
        </button>)
        : (
          <div className='user_profile'>
            <img src={assets.profile_icon} alt="user_icon" />
            <ul className='user_profile_menu'>
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon}/>
                <p>Order</p>
              </li>
              <hr />
              <li onClick={handleLogout}>
                <img src={assets.logout_icon}/>
                <p>Logout</p>
              </li>
            </ul>

          </div>
        )
        }
        
      </div>
    </div>
  );
}

export default Navbar