import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend-assets/assets'

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Order your favorite food from our food delivery website and enjoy
            delicious meals at home.{" "}
          </p>
          <div className="footer-social-icon">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon } alt="" />
          </div>
        </div>

        <div className="footer-content-center">
          <h3>COMPANY</h3>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Mobile App</li>
            <li>Contact Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h3>Get In Touch</h3>
          <ul>
            <li>
              +91 1234567890
            </li>
            <li>contact@example.com</li>
          </ul>
        </div>

      </div>

      <hr/>

      <div className="footer-copyright">
        <p>Copyright © 2025 Food Delivery App. All rights reserved.</p>
      </div>
      
    </div>
  );
}

export default Footer