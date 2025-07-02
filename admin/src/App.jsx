import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/sideBar/Sidebar'
import {Route, Routes} from 'react-router-dom'
import Add from './pages/add/Add'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'
import { ToastContainer, toast } from "react-toastify";

function App() {
  const url="https://food-del-backend-2xat.onrender.com";
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navbar />
      <hr></hr>

      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
