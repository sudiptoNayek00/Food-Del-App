import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import CartPage from './pages/Cart/CartPage'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Login from './components/Login/Login'
// import Verify from './pages/verify/Verify'
import { ToastContainer } from "react-toastify";
import Myorder from './pages/myOrders/Myorder'
import OrderConfirmation from './pages/verify/orderConfirm'


/**
 * App component that sets up the main layout of the application.
 * It includes the Navbar, Footer, and defines the Routes for different pages.
 * 
 * Routes:
 * - "/" renders the HomePage
 * - "/cart" renders the CartPage
 * - "/order" renders the PlaceOrder page
 */

function App() {
  const [login,setLogin] = useState(false);
  return (
    <>
      {login ? <Login setLogin={setLogin} /> : <></>}
      <div className="App_Containeer">
        <ToastContainer />
        <Navbar setLogin={setLogin} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/orderConfirm" element={<OrderConfirmation />} />
          <Route path="/myorders" element={<Myorder />} />
          {/* <Route path='' element={} /> */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App